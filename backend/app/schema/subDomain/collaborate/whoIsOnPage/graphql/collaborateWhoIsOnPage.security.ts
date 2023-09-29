import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const collaborateWhoIsOnPageSecurity = {
  Query: {
    collaborateWhoIsOnPage_getAllUsersFromPage: isAuthenticated,
  }
}

export default collaborateWhoIsOnPageSecurity