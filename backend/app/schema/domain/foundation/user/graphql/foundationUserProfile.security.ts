import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendAuthSecurity = {
  Query: {
    foundationUserProfile_getOne: isAuthenticated,
  },
  Mutation: {
    foundationUserProfile_updateOne: isAuthenticated,
  }
}

export default backendAuthSecurity