import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../../shield/rules"

export default {
  Query: {
    backendSiteDesigner_page_getOneById: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesigner_page_getManyWithPagination: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
  },
  Mutation: {
    backendSiteDesigner_page_addOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesigner_page_updateOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesigner_page_deleteOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
  }
}