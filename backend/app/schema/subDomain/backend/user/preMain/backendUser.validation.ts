import canUserSignUp from "./scripts/validation/canUserSignUp.script"
import doesUserHavePermission from "./scripts/validation/doesUserHavePermission.script"
import doesUserHaveRole from "./scripts/validation/doesUserHaveRole.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeBackendUserValidation(d: dependencies) {
  return {
    canUserSignUp: canUserSignUp(d),
    doesUserHavePermission: doesUserHavePermission(d),
    doesUserHaveRole: doesUserHaveRole(d),
    isIdValid: isIdValid(d),
    areIdsValid: areIdsValid(d),
  }
}