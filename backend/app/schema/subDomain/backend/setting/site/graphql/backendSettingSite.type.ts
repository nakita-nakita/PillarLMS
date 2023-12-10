import gql from "graphql-tag"

const applicationType = gql`

  type SettingSiteType {
    id: String,
    favicon: String
    tab: String
    isReady: Boolean
  }
  
  type SettingSiteRealTimeType {
    id: ID
    entity: String
    favicon: RealTimeFaviconSelection
    tab: RealTimeTextField
    isReady: RealTimeSwitch
  }

  type Query {
    backendSettingSite_getOne: SettingSiteType
    backendSettingSite_getOneRealTime(socketId: ID!): SettingSiteRealTimeType
  }
  type Mutation {
    backendSettingSite_upsertOne(id: ID, favicon: String, tab: String, isReady: Boolean): SettingSiteType
  }
`

export default applicationType