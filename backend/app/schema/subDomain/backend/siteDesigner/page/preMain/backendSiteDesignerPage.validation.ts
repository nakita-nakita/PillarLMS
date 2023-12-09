import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/pageValidation/areIdsValid.script"
import isIdValid from "./scripts/pageValidation/isIdValid.script"

export default function makeBackendSiteDesignerPageValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}