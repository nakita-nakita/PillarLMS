const gql = require("graphql-tag");
const applicationType = gql`
  type ResultObject {
    result: Boolean
    message: String
    data: String
  }

  type userIdObject {
    userId: Int
  }

  type AuthType {
    token: String
    userId: Int
    isCreator: Boolean
    isAdmin: Boolean
    username: String
    picture: String
  }

  type Query {
    getuserIdFromToken(token: String!) : userIdObject
    canUserSignUp : ResultObject
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthType
    signin(email: String!, password: String!): AuthType
    forgotPassword(email: String!) : ResultObject
  }
`;
module.exports = applicationType;
