import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/discussionCommentVoteValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionCommentVoteValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}