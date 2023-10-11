import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingChurchSecurity = {
  Query: {
    // backendSetting_church_getOne: and(isAuthenticated, isAdmin),
    backendSetting_church_getOne: isAuthenticated,
  },
  Mutation: {
    // backendSetting_email_updateOne: and(isAuthenticated, isAdmin),
    backendSetting_church_updateOne: isAuthenticated,
  }
}

export default backendSettingChurchSecurity