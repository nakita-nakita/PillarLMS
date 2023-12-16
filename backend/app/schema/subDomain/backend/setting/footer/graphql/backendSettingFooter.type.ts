import gql from "graphql-tag"

const backendSettingFooterGraphQLType = gql`

  type BackendSettingFooterRealTimeType {
    id: String,
    entity: String,
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    selectionType: String,
    selectionId: String,
    isReady: RealTimeSwitch
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
    backendSettingFooter_getOneRealTime(socketId: ID!): BackendSettingFooterRealTimeType
    backendSettingFooterBuiltIn_getMany:[BackendSettingFooterBuiltInType]
  }
  type Mutation {
    backendSettingFooter_upsertOne(id: ID!, selectionType: SelectionTypeEnum!, selectionId: ID!, userAnswers: String, isReady: Boolean): GlobalSuccessType
    backendSettingFooter_selectFooter(id: ID!, type: SelectionTypeEnum!, socketId: ID!): BackendSettingFooterRealTimeType
  }
`


// selectionType: {
//   type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
// },

export default backendSettingFooterGraphQLType