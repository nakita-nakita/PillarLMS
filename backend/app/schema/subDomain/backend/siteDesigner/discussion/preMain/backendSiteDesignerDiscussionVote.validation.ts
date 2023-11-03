import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/discussionVoteValidation/areIdsValid.script"
import isIdValid from "./scripts/discussionVoteValidation/isIdValid.script"

export default function makeBackendSiteDesignerDiscussionVoteValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}