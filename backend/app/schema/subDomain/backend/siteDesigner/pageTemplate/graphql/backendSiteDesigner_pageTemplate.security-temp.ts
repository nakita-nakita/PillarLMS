import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../../shield/rules"

export default {
  Query: {
    backendSiteDesigner_pageTemplate_getOneById: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesigner_pageTemplate_getManyWithPagination: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
  },
  Mutation: {
    backendSiteDesigner_pageTemplate_addOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesigner_pageTemplate_updateOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesigner_pageTemplate_deleteOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
  }
}