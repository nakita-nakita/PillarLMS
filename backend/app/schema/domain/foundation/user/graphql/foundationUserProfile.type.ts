import gql from "graphql-tag"

const backendAuthGqlType = gql`
  type ProfileType {
    id: ID! 
    firstName: String 
    lastName: String 
    username: String 
    picture: String 
    callByType: CallByTypeEnum 
    circleColor: String 
    labelColor: String
  }

  enum CallByTypeEnum {
    EMAIL,
    USERNAME,
    FIRST_NAME,
    LAST_NAME,
    FULL_NAME
  }

  type Query {
    foundationUserProfile_getOne: ProfileType
  }

  type Mutation {
    foundationUserProfile_updateOne(firstName: String, lastName: String, username: String, picture: String, callByType: CallByTypeEnum, circleColor: String, labelColor: String): ProfileType
  }
`


export default backendAuthGqlType;
