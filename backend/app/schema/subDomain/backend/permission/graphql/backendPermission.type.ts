import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendPermissionGqlType = gql`

  ${paginationType("BackendPermissionPaginationType", "BackendPermissionType")}

  type BackendPermissionType {
    id: ID
    name: String
  }
  
  input BackendPermissionInput {
    id: ID
    name: String
  }

  type Query {
    backendPermission_getOneById(id: ID): BackendPermissionType
    backendPermission_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendPermissionPaginationType
  }

  type Mutation {
    backendPermission_addOne(name: String!): BackendPermissionType
    backendPermission_updateOne(name: String!, id: ID!): BackendPermissionType
    backendPermission_deleteOne(id: ID!): GlobalSuccessType
  }
`

export default backendPermissionGqlType