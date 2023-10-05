import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/discussionVoteValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionVoteValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionVoteValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}