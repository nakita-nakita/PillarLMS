import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNicknameTaken from "./scripts/validation/isNicknameTaken.script"

export default function makeBackendSiteDesignerPageValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
    isNicknameTaken: isNicknameTaken(d),
  }
}