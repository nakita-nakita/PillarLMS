import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../../shield/rules"

export default {
  Query: {
    // backendSiteDesignerPage_getOneById: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesignerPage_getOneById: isAuthenticated,
    // backendSiteDesignerPage_getManyWithPagination: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesignerPage_getManyWithPagination: isAuthenticated,
  },
  Mutation: {
    // backendSiteDesignerPage_addOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_addOne: isAuthenticated,
    // backendSiteDesignerPage_updateOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_updateOne: isAuthenticated,
    // backendSiteDesignerPage_deleteOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_deleteOne: isAuthenticated,
  }
}