import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendNotificationGqlType = gql`

  ${paginationType("NotificationPaginationType", "NotificationType")}

  enum NotificationTypeEnum {
    SYSTEM
    DISCUSSION
  }

  type JsonResponseType {
    success: Boolean
  }

  type NewNotificationResponseType {
    doesUserHaveNewNotifications: Boolean
  }

  type NotificationType {
    id: ID
    type: NotificationTypeEnum
    message: String
    locationMessage: String
    hasBeenSeen: Boolean
    hasBeenClicked: Boolean
    url: String
    createdAt: String
  }

  input NotificationInput {
    id: ID
    type: NotificationTypeEnum
    message: String
    locationMessage: String
    hasBeenSeen: Boolean
    hasBeenClicked: Boolean
    url: String
  }
  
  type Query {
    backendNotification_getOneById(id: ID!): NotificationType
    backendNotification_getManyWithPagination(q: String, page: Int, pageSize: Int): NotificationPaginationType
    backendNotification_doYouHaveNewBackendNotifications: NewNotificationResponseType
  }
  type Mutation {
    backendNotification_hasBeenClicked(id: ID!): NotificationType
    backendNotifications_haveBeenSeen: JsonResponseType
    backendNotification_haveBeenSeen(userId: ID!): GlobalSuccessType
  }
  `

export default backendNotificationGqlType