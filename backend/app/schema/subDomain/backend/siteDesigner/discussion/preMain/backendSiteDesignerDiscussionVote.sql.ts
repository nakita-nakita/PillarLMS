import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMyVote from "./scripts/discussionVoteSql/getMyVote.script"
import getTotalVote from "./scripts/discussionVoteSql/getTotalVote.script"
import setMyVote from "./scripts/discussionVoteSql/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionVoteSql(d: dependencies) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}
