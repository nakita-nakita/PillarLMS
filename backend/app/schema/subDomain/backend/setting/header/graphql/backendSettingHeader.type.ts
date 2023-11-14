import gql from "graphql-tag"

const backendSettingHeaderGraphQLType = gql`

#type BackendSettingHeaderRealTimeType {
#  id: String,
#  entity: String,
#  title: RealTimeTextField,
#  description: RealTimeTextField,
#  image: RealTimePictureSelection,
#  isReady: RealTimeSwitch
#}
  type BackendSettingHeaderType {
    id: String,
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    isReady: Boolean
  }

  type BackendSettingHeaderBuiltInType {
    id: String,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
    category: String,
    theme: String,
  }

  type Query {
    # backendSettingHeader_getOneRealTime(socketId: String!): BackendSettingHeaderRealTimeType
    backendSettingHeaderBuiltIn_getMany:[BackendSettingHeaderBuiltInType]
  }
  type Mutation {
    backendSettingHeader_upsertOne(id: ID!, webAssetImport: String, menuJsonB: String, userAnswersJsonB: String, isReady: Boolean): BackendSettingHeaderType
  }
`

export default backendSettingHeaderGraphQLType