import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNameTaken from "./scripts/validation/isNameTaken.script"
import areNamesTaken from "./scripts/validation/areNamesTaken.script"

export default function makeBackendRoleValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
    isNameTaken: isNameTaken(d),
    areNamesTaken: areNamesTaken(d),

  }
}