import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingHeaderSecurity = {
  Query: {
    // backendSettingHeader_getOneRealTime: and(isAuthenticated, isAdmin),
    backendSettingHeader_getOneRealTime: isAuthenticated,
    backendSettingHeaderBuiltIn_getMany: isAuthenticated,
  },
  Mutation: {
    // backendSettingHeader_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingHeader_upsertOne: isAuthenticated,
  }
}

export default backendSettingHeaderSecurity