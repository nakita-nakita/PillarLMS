import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMyVote from "./scripts/discussionCommentVoteSql/getMyVote.script"
import getTotalVote from "./scripts/discussionCommentVoteSql/getTotalVote.script"
import setMyVote from "./scripts/discussionCommentVoteSql/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteSql(d: dependencies) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}
