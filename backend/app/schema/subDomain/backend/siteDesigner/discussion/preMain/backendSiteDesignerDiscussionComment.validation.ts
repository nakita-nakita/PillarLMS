import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/discussionCommentValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionCommentValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionCommentValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}