import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendNotificationSecurity = {
  Query: {
    backendNotification_getOneById: isAuthenticated,
    backendNotification_getManyWithPagination: isAuthenticated,
    backendNotification_doYouHaveNewBackendNotifications: isAuthenticated,
  },
  Mutation: {
    backendNotification_hasBeenClicked: isAuthenticated,
    backendNotification_haveBeenSeen: isAuthenticated,
  }
}

export default backendNotificationSecurity
// const { isAuthenticated, isAdmin, isOpened, isOwnerOfToDoList } = require("../../../../../shield/rules")

// module.exports = {
//   Query: {
//     backendNotification_get: isAuthenticated,
//     backendNotification_getMany: isAuthenticated,
//     backendNotification_doYouHaveNewBackendNotifications: isAuthenticated,
//   },
//   Mutation: {
//     backendNotification_hasBeenClicked: isAuthenticated,
//     backendNotifications_haveBeenSeen: isAuthenticated,
//   }
// }