import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    backendRole_getOneById: and(isAuthenticated, isAdmin),
    backendRole_getManyWithPagination: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    backendRole_addOne: and(isAuthenticated, isAdmin),
    backendRole_updateOne: and(isAuthenticated, isAdmin),
    backendRole_deleteOne: and(isAuthenticated, isAdmin),

    backendRoleManyPermission_addOne: and(isAuthenticated, isAdmin),
    backendRoleManyPermission_deleteOne: and(isAuthenticated, isAdmin),
    backendRoleManyPermission_setList: and(isAuthenticated, isAdmin),
  }
}

export default backendPermissionSecurity