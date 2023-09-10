import gql from "graphql-tag"

const foundationAuthGqlType = gql`

  type CookieType {
    cookie: String
  }

  type TokenType {
    token: String
  }

  type Mutation {
    foundationAuth_signup(email: String!, password: String!, confirmPassword: String!): TokenType
    foundationAuth_signin(email: String!, password: String!): TokenType
    foundationAuth_devSignin(email: String!, password: String!): TokenType
    foundationAuth_forgotPassword(email: String!) : ReturningSuccessObj
    foundationAuth_isTokenValid(token: String!) : ReturningSuccessObj
  }
`


export default foundationAuthGqlType;
