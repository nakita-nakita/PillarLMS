import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

export default {
  Query: {
    backendSiteDesignerSetting_getOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_readAccess_getAll:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_settingAccess_getAll:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_updateAccess_getAll:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
  },
  Mutation: {
    backendSiteDesignerSetting_updateOne:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_readAccess_setList:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_settingAccess_setList:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
    backendSiteDesignerSetting_updateAccess_setList:  and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-setting']))),
  }
}