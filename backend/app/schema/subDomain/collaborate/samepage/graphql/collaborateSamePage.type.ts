import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendPermissionGqlType = gql`

  type samePageType {
    total: Int
    users: [UserDisplay]
  }

  type Query {
    collaborateSamePage_getAllUsersFromPage(url: String): samePageType
  }

  type Mutation {
    collaborateSamePage_addUserToPage(userId: ID, url: String): samePageType
    collaborateSamePage_removeUserFromPage(userId: ID, url: String): samePageType
  }
`

export default backendPermissionGqlType