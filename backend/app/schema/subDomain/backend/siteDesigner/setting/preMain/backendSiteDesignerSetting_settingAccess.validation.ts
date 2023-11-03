import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/settingAccessValidation/areIdsValid.script"
import isIdValid from "./scripts/settingAccessValidation/isIdValid.script"

export default function makeBackendSiteDesignerSettingSettingAccessValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}
