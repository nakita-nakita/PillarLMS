import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import areNamesTaken from "./scripts/validation/areNamesTaken.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNameTaken from "./scripts/validation/isNameTaken.script"

export default function makeBackendPermissionValidation(d: dependencies) {
  return {
    areIdsValid: areIdsValid(d),
    areNamesTaken: areNamesTaken(d),
    isIdValid: isIdValid(d),
    isNameTaken: isNameTaken(d),
  }
}