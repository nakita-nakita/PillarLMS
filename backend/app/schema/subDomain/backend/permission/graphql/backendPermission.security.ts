import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    backendPermission_getOneById: and(isAuthenticated, isAdmin),
    backendPermission_getManyWithPagination: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    backendPermission_addOne: and(isAuthenticated, isAdmin),
    backendPermission_updateOne: and(isAuthenticated, isAdmin),
    backendPermission_deleteOne: and(isAuthenticated, isAdmin),
  }
}

export default backendPermissionSecurity