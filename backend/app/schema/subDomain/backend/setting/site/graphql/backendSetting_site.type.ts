import gql from "graphql-tag"

const applicationType = gql`

  type BackendSettingSiteType {
    churchShortName: String,
    favicon: String
  }
  type Query {
    backendSetting_site_getOne: BackendSettingSiteType
  }
  type Mutation {
    backendSetting_site_updateOne(churchShortName: String, favicon: String): BackendSettingSiteType
  }
`

export default applicationType