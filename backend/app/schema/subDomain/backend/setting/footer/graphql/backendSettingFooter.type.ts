import gql from "graphql-tag"

const backendSettingFooterGraphQLType = gql`

  # type BackendSettingFooterRealTimeType {
  #   id: String,
  #   entity: String,
  #   title: RealTimeTextField,
  #   description: RealTimeTextField,
  #   image: RealTimePictureSelection,
  #   isReady: RealTimeSwitch
  # }
  type BackendSettingFooterType {
    id: String,
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    isReady: Boolean
  }

  type BackendSettingFooterBuiltInType {
    id: String,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }

  type Query {
    # backendSettingFooter_getOneRealTime(socketId: String!): BackendSettingFooterRealTimeType
    backendSettingFooterBuiltIn_getMany:[BackendSettingFooterBuiltInType]
  }
  type Mutation {
    backendSettingFooter_upsertOne(id: ID!, webAssetImport: String, menuJsonB: String, userAnswersJsonB: String, isReady: Boolean): BackendSettingFooterType
  }
`

export default backendSettingFooterGraphQLType