import { d_sub } from "../../../utils/types/dependencyInjection.types";
import makeBackendRoleMain from "./main/backendRole.main";
import makeBackendRoleValidation from "./preMain/backendRole.validation";
import makeBackendRoleManyPermissionMain from "./main/backendRoleManyPermission.main";
import makeBackendRoleManyPermissionValidation from "./preMain/backendRoleManyPermission.validation";

export default function makeBackendRoleEntity(d: d_sub) {
  const main = makeBackendRoleMain(d)
  const validators = makeBackendRoleValidation(d)
  const roleManyPermissionMain = makeBackendRoleManyPermissionMain(d)
  const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d)

  return {
    roleEntity: {
      ...main,
      ...validators,
    },
    roleManyPermissionEntity: {
      ...roleManyPermissionMain,
      ...roleManyPermissionValidation,
    },
  }
}