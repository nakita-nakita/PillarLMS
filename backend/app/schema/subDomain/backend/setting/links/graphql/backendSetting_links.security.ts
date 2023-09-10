import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingLinksSecurity = {
  Query: {
    // backendSetting_links_getOne: and(isAuthenticated, isAdmin),
    backendSetting_links_getOne: isAuthenticated,
  },
  Mutation: {
    // backendSetting_links_updateOne: and(isAuthenticated, isAdmin),
    backendSetting_links_updateOne: isAuthenticated,
  }
}

export default backendSettingLinksSecurity