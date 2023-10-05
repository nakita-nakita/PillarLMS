import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

// and(isAuthenticated, hasPermissions("read_site"))
const backendSiteDesignerDiscussionSecurity = {
  Query: {
    backendSiteDesignerDiscussion_getOneById: isAuthenticated,
    backendSiteDesignerDiscussion_getManyWithPagination: isAuthenticated,
    backendSiteDesignerDiscussionComment_getOneById: isAuthenticated,
    backendSiteDesignerDiscussionComment_getManyWithPagination: isAuthenticated,
    backendSiteDesignerDiscussionVote_getMyVote: isAuthenticated,
    backendSiteDesignerDiscussionVote_getTotalVote: isAuthenticated,
    backendSiteDesignerDiscussionCommentVote_getMyVote: isAuthenticated,
    backendSiteDesignerDiscussionCommentVote_getTotalVote: isAuthenticated,

  },
  Mutation: {
    backendSiteDesignerDiscussion_addOne: isAuthenticated,
    backendSiteDesignerDiscussion_deleteOne: isAuthenticated,
    backendSiteDesignerDiscussion_updateOne: isAuthenticated,
    backendSiteDesignerDiscussionComment_addOne: isAuthenticated,
    backendSiteDesignerDiscussionComment_deleteOne: isAuthenticated,
    backendSiteDesignerDiscussionComment_updateOne: isAuthenticated,
    backendSiteDesignerDiscussionVote_setMyVote: isAuthenticated,
    backendSiteDesignerDiscussionCommentVote_setMyVote: isAuthenticated,
  }
}

export default backendSiteDesignerDiscussionSecurity