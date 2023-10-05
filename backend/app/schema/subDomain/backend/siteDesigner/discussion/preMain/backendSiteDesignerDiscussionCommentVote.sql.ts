import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getMyVote from "./scripts/discussionCommentVoteSql/getMyVote.script"
import getTotalVote from "./scripts/discussionCommentVoteSql/getTotalVote.script"
import setMyVote from "./scripts/discussionCommentVoteSql/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteSql(d: d_sub) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}
