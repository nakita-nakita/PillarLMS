import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendAuthSecurity = {
  Query: {
    foundationUser_getOne: isAuthenticated,
  },
  Mutation: {
    foundationUser_deactivateMe: isAuthenticated,
    foundationUser_reactivateMe: isAuthenticated,
  }
}

export default backendAuthSecurity