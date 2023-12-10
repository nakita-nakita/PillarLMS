import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingLinkSecurity = {
  Query: {
    backendSettingLink_getOne: isAuthenticated,
    // backendSettingLink_getOneRealTime: and(isAuthenticated, isAdmin),
    backendSettingLink_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingLink_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingLink_upsertOne: isAuthenticated,
  }
}

export default backendSettingLinkSecurity