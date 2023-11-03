import { Model } from "sequelize"
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model"
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func"
import stringHelpers from "../../../../../../utils/stringHelpers"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import makeFoundationUserSql from "../../../preMain/foundationUser.sql"
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"

type input = {
  email: string
  password: string
  isDeactivated?: boolean
}

export default function addMany(d: dependencies) {
  return async (foundationUserArray: input[]): Promise<returningSuccessObj<Model<foundationUser>[] | null>> => {

    const foundationUserSql = makeFoundationUserSql(d)
    const foundationUserValidation = makeFoundationUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================
    
    if (!foundationUserArray || foundationUserArray?.length === 0) {
      return endMainFromError({
        hint: "No data was provided.",
        errorIdentifier: "foundationUser_addMany_error0001",
      })
    }

    if (foundationUserArray.length > 50) {
      return endMainFromError({
        hint: "Only 50 records max can be processed at once.",
        errorIdentifier: "foundationUser_addMany_error0002",
      })
    }

    const emails = foundationUserArray.map(user => user.email).filter(email => email !== null && email !== undefined)

    if (emails.length !== foundationUserArray.length) {
      return endMainFromError({
        hint: "All records require an email.",
        errorIdentifier: "foundationUser_addMany_error0003",
      })
    }

    const areStringsValidEmails = stringHelpers.areStringsValidEmails({
      strArr: emails
    })

    if (!areStringsValidEmails.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "foundationUser_addMany_error0004",
      })
    }

    const isEmailTaken = await foundationUserValidation.areEmailsTaken(emails).catch(error => d.errorHandler(error, d.loggers))

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is taken.",
        errorIdentifier: "foundationUser_addMany_error0005",
      })
    }

    const passwords = foundationUserArray.map(user => user.password).filter(password => password !== null && password !== undefined)

    if (passwords.length !== foundationUserArray.length) {
      return endMainFromError({
        hint: "All records require a password.",
        errorIdentifier: "foundationUser_addMany_error0006",
      })
    }

    const arePasswordsValid: returningSuccessObj<null> = await foundationUserValidation.arePasswordsValid(foundationUserArray).catch(error => d.errorHandler(error, d.loggers))

    if (!arePasswordsValid.result) {
      return endMainFromError({
        hint: arePasswordsValid.humanMessage,
        errorIdentifier: "foundationUser_addMany_error0007"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await foundationUserSql.addMany(foundationUserArray).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
