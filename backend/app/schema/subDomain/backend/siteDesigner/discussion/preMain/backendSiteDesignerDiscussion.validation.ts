import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/discussionValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}