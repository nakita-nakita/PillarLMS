import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/readAccessValidation/areIdsValid.script"
import isIdValid from "./scripts/readAccessValidation/isIdValid.script"

export default function makeBackendSiteDesignerSettingReadAccessValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}