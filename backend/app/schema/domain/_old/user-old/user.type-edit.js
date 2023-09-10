const gql = require("graphql-tag");
const { paginationType } = require("../../utils");

const userType = gql`

  ${paginationType("UserPaginationType", "UserType")}

  type UserType {
    id: ID
    username: String
    email: String
    profile: UserProfileType
    isCreator: Boolean
    isAdmin: Boolean
    permissionMany(q: String, page: Int, pageSize: Int): PermissionPaginationType
    roleMany(q: String, page: Int, pageSize: Int): RolePaginationType
  }
  
  input UserInput {
    id: ID
    username: String
    email: String
    profile: UserProfileInput
    permissionMany: [PermissionInput]
    roleMany: [RoleInput]
  }

  type UserProfileType {
    id: ID
    name: String
    birthday: String
    location: String
    website: String
    picture: String
  }

  input UserProfileInput {
    id: ID
    name: String
    birthday: String
    location: String
    website: String
    picture: String
  }

  type UserAvatarChipType {
    username: String,
    profile_picture: String
  }

  type Query {
    user(id: ID): UserType
    userMany(q: String, page: Int, pageSize: Int): UserPaginationType
    userAvatarChip(id: ID): UserAvatarChipType
    userMyself: UserType
  }
  type Mutation {
    userAdd(username: String!, email: String!, password: String!, profile: UserProfileInput, permissionMany: [PermissionInput], roleMany: [RoleInput]): UserType
    userUpdateMyUser(id: Int!, username: String, email: String, password: String, profile: UserProfileInput): UserType
    userUpdate(id: Int!, username: String, email: String, password: String, profile: UserProfileInput): UserType
    userDelete(id: Int!): UserType
    
    userAddPermission(userId: Int!, permissionId: Int!) : PermissionType
    userRemovePermission(userId: Int!, permissionId: Int!) : PermissionType
    userAddRole(userId: Int!, roleId: Int!) : RoleType
    userRemoveRole(userId: Int!, roleId: Int!) : RoleType
  }
`;
module.exports = userType;