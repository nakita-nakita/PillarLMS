import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleManyPermissionSql from "../../../preMain/backendRoleManyPermission.sql";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  roleId: string
}

export default function getAll(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRoleManyPermission>[] | null>> => {
    const { roleId } = args

    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d);
    const roleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================
    if (!roleId) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is missing.",
        errorIdentifier: "backendRoleManyPermission_getAll_error0001"
      })
    }

    const isRoleIdUuid = stringHelpers.isStringValidUuid({
      str: roleId
    })

    if (!isRoleIdUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_getAll_error0002"
      })
    }

    const isRoleIdValid = await roleValidation.isIdValid({
      id: roleId,
    })

    if (!isRoleIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_getAll_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await roleManyPermissionSql.getAll({
      roleId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
