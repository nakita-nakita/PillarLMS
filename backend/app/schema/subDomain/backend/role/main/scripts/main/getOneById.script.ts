import { Model } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const backendRoleSql = makeBackendRoleSql(d);
    const backendRoleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_getOneById_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_getOneById_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await backendRoleSql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}