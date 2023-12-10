import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingSiteSecurity = {
  Query: {
    backendSettingSite_getOne: isAuthenticated,
    // backendSettingSite_getOneRealTime: and(isAuthenticated, isAdmin),
    backendSettingSite_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingSite_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingSite_upsertOne: isAuthenticated,
  }
}

export default backendSettingSiteSecurity
