import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getMyVote from "./scripts/discussionVote/getMyVote.script"
import getTotalVote from "./scripts/discussionVote/getTotalVote.script"
import setMyVote from "./scripts/discussionVote/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionVoteMain(d: d_sub) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}

