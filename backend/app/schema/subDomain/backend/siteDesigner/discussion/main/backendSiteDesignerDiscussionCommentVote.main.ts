import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMyVote from "./scripts/discussionCommentVote/getMyVote.script"
import getTotalVote from "./scripts/discussionCommentVote/getTotalVote.script"
import setMyVote from "./scripts/discussionCommentVote/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteMain(d: dependencies) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}

