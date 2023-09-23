import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendNotificationGqlType = gql`

  ${paginationType("NotificationPaginationType", "NotificationType")}


  type NotificationType {
    id: ID
    message: String
    hasBeenSeen: Boolean
    hasBeenClicked: Boolean
    action: String
    createdAt: String
  }

  input NotificationInput {
    id: ID
    message: String
    hasBeenSeen: Boolean
    hasBeenClicked: Boolean
    action: String
    createdAt: String
  }
  
  type Query {
    backendNotification_getOneById(id: ID!): NotificationType
    backendNotification_getManyWithPagination(q: String, page: Int, pageSize: Int): NotificationPaginationType
    backendNotification_getFirstByCount(count: Int): [NotificationType]
    backendNotification_getUnseenNotificationCount: Int

  }
  type Mutation {
    backendNotification_hasBeenClicked(id: ID!): GlobalSuccessType
    backendNotification_hasBeenSeen: GlobalSuccessType
    backendNotification_hasBeenSeenById(id: ID!): GlobalSuccessType
    

  }
  `

export default backendNotificationGqlType