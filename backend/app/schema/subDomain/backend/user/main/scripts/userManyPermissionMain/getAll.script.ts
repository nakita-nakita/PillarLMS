import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";
import backendUserManyPermission from "../../../../../../../models/subDomain/backend/user/backendUserManyPermission.model";

type input = {
  id: string
}

export default function getAll({ subDomainDb, domainDb, errorHandler, subDomainTransaction, domainTransaction, loggers }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[]>> => {

    const d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler,
      loggers,
    }

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)
    const userValidation = makeFoundationUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserManyPermission_getAll_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserManyPermission_getAll_error0002"
      })
    }

    // const isUserIdValid = await userValidation.isIdValid({
    //   id: args.id,
    // }).catch(error => errorHandler(error, loggers))

    // if (!isUserIdValid.result) {
    //   return endMainFromError({
    //     hint: "'id' is not valid.",
    //     errorIdentifier: "backendUserManyPermission_getAll_error0002"
    //   })
    // }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyPermissionSql.getAll({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}