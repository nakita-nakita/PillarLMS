import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/updateAccessValidation/areIdsValid.script"
import isIdValid from "./scripts/updateAccessValidation/isIdValid.script"

export default function makeBackendSiteDesignerSettingUpdateAccessValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}
