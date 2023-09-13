import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";
import makeBackendPermissionValidation from "../../../preMain/backendPermission.validation";

type input = {
  id: string
}

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const backendPermissionSql = makeBackendPermissionSql(d);
    const backendPermissionValidation = makeBackendPermissionValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendPermission_getOneById_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendPermission_getOneById_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendPermissionSql.getOneById({
      id: args.id,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}