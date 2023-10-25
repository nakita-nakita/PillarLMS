import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingColorsSecurity = {
  Query: {
    // backendSettingColors_getOne: and(isAuthenticated, isAdmin),
    backendSettingColors_getOne: isAuthenticated,
    backendSettingColors_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingColors_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingColors_upsertOne: isAuthenticated,
  }
}

export default backendSettingColorsSecurity
