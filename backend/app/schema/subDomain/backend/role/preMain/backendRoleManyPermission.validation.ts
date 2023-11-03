import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/backendRoleManyPermissionValidation/areIdsValid.script"
import doesRoleHavePermission from "./scripts/backendRoleManyPermissionValidation/doesRoleHavePermission.script"
import isIdValid from "./scripts/backendRoleManyPermissionValidation/isIdValid.script"

export default function makeBackendRoleManyPermissionValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    doesRoleHavePermission: doesRoleHavePermission(d),
    isIdValid: isIdValid(d),
  }
}