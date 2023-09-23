import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendNotificationSecurity = {
  Query: {
    backendNotification_getOneById: isAuthenticated,
    backendNotification_getManyWithPagination: isAuthenticated,
    backendNotification_getFirstByCount: isAuthenticated,
    backendNotification_getUnseenNotificationCount: isAuthenticated,
  },
  Mutation: {
    backendNotification_hasBeenClicked: isAuthenticated,
    backendNotification_hasBeenSeen: isAuthenticated,
    backendNotification_hasBeenSeenById: isAuthenticated,
  }
}

export default backendNotificationSecurity