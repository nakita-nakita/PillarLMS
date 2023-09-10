import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingColorsSecurity = {
  Query: {
    // backendSetting_colors_getOne: and(isAuthenticated, isAdmin),
    backendSetting_colors_getOne: isAuthenticated,
  },
  Mutation: {
    // backendSetting_colors_updateOne: and(isAuthenticated, isAdmin),
    backendSetting_colors_updateOne: isAuthenticated,
  }
}

export default backendSettingColorsSecurity
