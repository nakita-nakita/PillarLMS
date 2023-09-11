import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendPermissionGqlType = gql`
  ${paginationType("BackendRolePaginationType", "BackendRoleType")}

  type BackendRoleType {
    id: ID
    name: String
    permission_getAll(q: String, page: Int, pageSize: Int): [BackendPermissionType]
  }

  input BackendRoleInput {
    id: ID
    name: String
  }

  input BackendRolePermissionInput {
    roleId: ID
    permission: ID
  }
  
  type Query {
    backendRole_getOneById(id: ID): BackendRoleType
    backendRole_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendRolePaginationType
  }
  
  type Mutation {
    backendRole_addOne(name: String!, permissions: [BackendPermissionInput]): BackendRoleType
    backendRole_updateOne(id: ID!, name: String!): BackendRoleType
    backendRole_deleteOne(id: ID!): BackendRoleType

    backendRoleManyPermission_addOne(roleId: ID!, permissionId: ID!) : BackendRoleType
    backendRoleManyPermission_deleteOne(roleId: ID!, permissionId: ID!) : GlobalSuccessType
    backendRoleManyPermission_setList(roleManyPermissionArray:[BackendRolePermissionInput]!): GlobalSuccessType
  }
`

export default backendPermissionGqlType
