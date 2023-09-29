import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const collaborateWhoIsOnPageGqlType = gql`

  type WhoIsOnPageType {
    total: Int
    users: [UserDisplay]
  }

  type Query {
    collaborateWhoIsOnPage_getAllUsersFromPage(url: String): WhoIsOnPageType
  }
`

export default collaborateWhoIsOnPageGqlType