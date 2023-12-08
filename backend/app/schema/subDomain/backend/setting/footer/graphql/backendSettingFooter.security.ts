import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingFooterSecurity = {
  Query: {
    // backendSettingFooter_getOneRealTime: and(isAuthenticated, isAdmin),
    backendSettingFooter_getOneRealTime: isAuthenticated,
    backendSettingFooterBuiltIn_getMany: isAuthenticated,
  },
  Mutation: {
    // backendSettingFooter_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingFooter_upsertOne: isAuthenticated,
    backendSettingFooter_selectFooter: isAuthenticated,
  }
}

export default backendSettingFooterSecurity