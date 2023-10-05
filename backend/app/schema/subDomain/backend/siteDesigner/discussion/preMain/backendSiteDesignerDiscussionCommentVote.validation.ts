import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/discussionCommentVoteValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionCommentVoteValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}