import { Model } from "sequelize";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getAll(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole>[]>> => {

    const { errorHandler, loggers } = d

    const userManyRoleSql = makeBackendUserManyRoleSql(d)
    const userValidation = makeBackendUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserManyRole_getAll_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserManyRole_getAll_error0002"
      })
    }

    // const isUserIdValid = await userValidation.isIdValid({
    //   id: args.id,
    // }).catch(error => errorHandler(error, loggers))

    // if (!isUserIdValid.result) {
    //   return endMainFromError({
    //     hint: "'id' is not valid.",
    //     errorIdentifier: "backendUserManyRole_getAll_error0002"
    //   })
    // }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyRoleSql.getAll({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}