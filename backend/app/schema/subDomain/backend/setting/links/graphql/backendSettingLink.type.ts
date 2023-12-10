import gql from "graphql-tag"

const backendSettingLinkGraphQLType = gql`

type BackendSettingLinkRealTimeType {
  id: String,
  entity: String,
  title: RealTimeTextField,
  description: RealTimeTextField,
  image: RealTimePictureSelection,
  isReady: RealTimeSwitch
}
  type BackendSettingLinkType {
    id: String,
    title: String,
    description: String,
    image: String,
    isReady: Boolean
  }

  type Query {
    backendSettingLink_getOne: BackendSettingLinkType
    backendSettingLink_getOneRealTime(socketId: String!): BackendSettingLinkRealTimeType
  }
  type Mutation {
    backendSettingLink_upsertOne(id: ID!, title: String, description: String, image: String, isReady: Boolean): BackendSettingLinkType
  }
`

export default backendSettingLinkGraphQLType