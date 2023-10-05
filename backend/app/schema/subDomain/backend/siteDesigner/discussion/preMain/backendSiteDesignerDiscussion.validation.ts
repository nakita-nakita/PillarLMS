import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/discussionValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}