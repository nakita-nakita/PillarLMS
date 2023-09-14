import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    collaborateSamePage_getAllUsersFromPage: isAuthenticated,
  },
  Mutation: {
    collaborateSamePage_addUserToPage: isAuthenticated,
    collaborateSamePage_removeUserFromPage: isAuthenticated,
  }
}

export default backendPermissionSecurity