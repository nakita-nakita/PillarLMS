import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    clientUser_getOneById: isAuthenticated,
    clientUser_getManyWithPagination: isAuthenticated,
  },
  Mutation: {
    clientUser_addOne: isAuthenticated,
    clientUser_updateOne: isAuthenticated,
    clientUser_deleteOne: isAuthenticated,
  }
}