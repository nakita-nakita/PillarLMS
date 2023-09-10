import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendPermissionEntity from "../../../../permission";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import makeBackendRoleManyPermissionSql from "../../../preMain/backendRoleManyPermission.sql";
import makeBackendRoleManyPermissionValidation from "../../../preMain/backendRoleManyPermission.validation";

type input = {
  permissionId: string
  roleId: string
}

export default function deleteOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRoleManyPermission> | null>> => {
    const { roleId, permissionId } = args

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d);
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d);
    const roleValidation = makeBackendRoleValidation(d);
    const { permissionEntity } = makeBackendPermissionEntity(d);

    //////////////////////////////////////
    // Validations
    // ===================================
    if (!permissionId) {
      return endMainFromError({
        hint: "Datapoint 'permissionId' is missing.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0001"
      })
    }

    const isPermissionIdUuid = stringHelpers.isStringValidUuid({
      str: permissionId
    })

    if (!isPermissionIdUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'permissionId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0002"
      })
    }

    if (!roleId) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is missing.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0003"
      })
    }

    const isRoleIdUuid = stringHelpers.isStringValidUuid({
      str: roleId
    })

    if (!isRoleIdUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0004"
      })
    }

    const isPermissionIdValid = await permissionEntity.isIdValid({
      id: permissionId,
    })

    const isRoleIdValid = await roleValidation.isIdValid({
      id: roleId,
    })

    if (!isPermissionIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0005"
      })
    }

    if (!isRoleIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0006"
      })
    }

    const doesRoleHavePermission = await roleManyPermissionValidation.doesRoleHavePermission({
      permissionId: permissionId,
      roleId: roleId,
    })

    if (!doesRoleHavePermission.result) {
      return endMainFromError({
        hint: "Can not delete because role doesn't have permission.",
        errorIdentifier: "backendRoleManyPermission_deleteOne_error0007"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await roleManyPermissionSql.deleteOne({
      permissionId,
      roleId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}