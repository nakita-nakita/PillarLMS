import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    collaborateSamePage_getAllUsersFromPage: isAuthenticated,
  }
}

export default backendPermissionSecurity