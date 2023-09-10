import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNicknameTaken from "./scripts/validation/isNicknameTaken.script"

export default function makeBackendSiteDesignerPageTemplateValidation(dbSub: d_sub) {

  return {
    areIdsValid: areIdsValid(dbSub),
    isIdValid: isIdValid(dbSub),
    isNicknameTaken: isNicknameTaken(dbSub),
  }
}