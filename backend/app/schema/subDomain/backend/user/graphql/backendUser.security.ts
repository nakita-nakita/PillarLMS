import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    backendUser_getOneById: and(isAuthenticated, isAdmin),
    backendUser_getManyWithPagination: and(isAuthenticated, isAdmin),
    
    backendUserBasicView_me: and(isAuthenticated),
    backendUserBasicView_them: and(isAuthenticated),
    
    backendUserManyPermission_getAll: and(isAuthenticated, isAdmin),
    backendUserManyRole_getAll: and(isAuthenticated, isAdmin),
    
    backendUserProfile_getOneById: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    backendUser_addOne: and(isAuthenticated, isAdmin),
    backendUser_updateOne: and(isAuthenticated, isAdmin),
    backendUser_deleteOne: and(isAuthenticated, isAdmin),

    backendUserManyPermission_setList: and(isAuthenticated, isAdmin),
    backendUserManyRole_setList: and(isAuthenticated, isAdmin),
    
    backendUserProfile_deactivateOne: and(isAuthenticated, isAdmin),
    backendUserProfile_reactivateOne: and(isAuthenticated, isAdmin),
    backendUserProfile_updateOne: and(isAuthenticated, isAdmin),
  }
}

export default backendPermissionSecurity