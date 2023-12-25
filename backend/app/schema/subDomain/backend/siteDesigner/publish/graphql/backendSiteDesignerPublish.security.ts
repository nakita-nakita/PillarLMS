import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../../shield/rules"

export default {
  Query: {
    backendSiteDesignerPublishRecord_getManyWithPagination: isAuthenticated,
  },
  Mutation: {
    backendSiteDesignerPublish_publishSite: isAuthenticated,
  },
}