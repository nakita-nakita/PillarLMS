import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
  username?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const { errorHandler, loggers } = d

    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserAccount_updateOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserAccount_updateOne_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.updateOne({
      id: args.id,
      isAdmin: args.isAdmin,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}