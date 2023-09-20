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
`

export default backendPermissionGqlType