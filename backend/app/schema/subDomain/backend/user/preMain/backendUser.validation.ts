import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import canUserSignUp from "./scripts/validation/canUserSignUp.script"
import doesUserHavePermission from "./scripts/validation/doesUserHavePermission.script"
import doesUserHaveRole from "./scripts/validation/doesUserHaveRole.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import areIdsValid from "./scripts/validation/areIdsValid.script"

export default function makeBackendUserValidation(d: d_sub) {
  return {
    canUserSignUp: canUserSignUp(d),
    doesUserHavePermission: doesUserHavePermission(d),
    doesUserHaveRole: doesUserHaveRole(d),
    isIdValid: isIdValid(d),
    areIdsValid: areIdsValid(d),
  }
}