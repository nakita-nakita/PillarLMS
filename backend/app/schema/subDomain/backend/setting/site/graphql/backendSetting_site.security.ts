import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingSiteSecurity = {
  Query: {
    // backendSetting_site_getOne: and(isAuthenticated, isAdmin),
    backendSetting_site_getOne: isAuthenticated,
  },
  Mutation: {
    // backendSetting_site_updateOne: and(isAuthenticated, isAdmin),
    backendSetting_site_updateOne: isAuthenticated,
  }
}

export default backendSettingSiteSecurity
