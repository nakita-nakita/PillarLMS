import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSiteDesignerDiscussionSecurity = {
  Query: {
    backendSiteDesigner_discussion_getOneById: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussion_getManyWithPagination: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionComment_getOneById: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionComment_getMany: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionVote_getMyVote: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionVote_getTotalVote: and(isAuthenticated, hasPermissions("read_site")),

  },
  Mutation: {
    backendSiteDesigner_discussion_addOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussion_deleteOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussion_updateOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionComment_addOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionComment_deleteOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionComment_updateOne: and(isAuthenticated, hasPermissions("read_site")),
    backendSiteDesigner_discussionVote_setMyVote: and(isAuthenticated, hasPermissions("read_site")),
  }
}

export default backendSiteDesignerDiscussionSecurity