import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendMediaManagerSecurity = {
  Query: {
    backendMediaManagerFile_getOneById: isAuthenticated,
    backendMediaManagerFile_viewTrash: isAuthenticated,
    backendMediaManagerFile_getMany: isAuthenticated,
    backendMediaManagerFolder_getMany: isAuthenticated,
    backendMediaManagerFolder_getBreadCrumb: isAuthenticated,
  },
  Mutation: {
    backendMediaManagerFile_rename: isAuthenticated,
    backendMediaManagerFile_deleteOne: isAuthenticated,
    backendMediaManagerFolder_addOne: isAuthenticated,
    backendMediaManagerFolder_rename: isAuthenticated,
    backendMediaManagerFolder_deleteOne: isAuthenticated,
    backendMediaManagerFile_restoreTrashed: isAuthenticated,

  }
}

export default backendMediaManagerSecurity