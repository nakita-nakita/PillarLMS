import gql from "graphql-tag"

const backendSettingFooterGraphQLType = gql`

   type BackendSettingFooterRealTimeType {
     id: String,
     entity: String,
     webAssetImport: String,
     menuJsonB: String,
     userAnswersJsonB: String,
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
    backendSettingFooter_upsertOne(id: ID!, webAssetImport: String, menuJsonB: String, userAnswersJsonB: String, isReady: Boolean): GlobalSuccessType
  }
`

export default backendSettingFooterGraphQLType