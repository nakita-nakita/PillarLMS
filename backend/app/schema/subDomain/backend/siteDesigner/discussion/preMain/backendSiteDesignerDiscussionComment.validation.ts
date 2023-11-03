import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/discussionCommentValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionCommentValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionCommentValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}