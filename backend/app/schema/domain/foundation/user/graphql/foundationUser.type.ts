import gql from "graphql-tag"

const backendAuthGqlType = gql`
  type UserType {
    id: ID! 
    email: String
    isDeactivated: Boolean
  }

  type Query {
    foundationUser_getOne: UserType
  }

  type Mutation {
    foundationUser_deactivateMe: ReturningSuccessObj
    foundationUser_reactivateMe: ReturningSuccessObj
  }
`


export default backendAuthGqlType;
