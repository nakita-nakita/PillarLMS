import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNameTaken from "./scripts/validation/isNameTaken.script"
import areNamesTaken from "./scripts/validation/areNamesTaken.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeBackendRoleValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
    isNameTaken: isNameTaken(d),
    areNamesTaken: areNamesTaken(d),
  }
}