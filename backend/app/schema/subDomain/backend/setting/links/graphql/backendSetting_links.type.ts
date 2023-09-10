import gql from "graphql-tag"

const applicationType = gql`

  type BackendSettingLinksType {
    donationLink: String,
    virtualServicesLink: String,
    defaultMetaPicture: String,
    defaultMetaTitle: String,
    defaultMetaDescription: String
  }

  type Query {
    backendSetting_links_getOne: BackendSettingLinksType
  }
  type Mutation {
    backendSetting_links_updateOne(donationLink: String, virtualServicesLink: String, defaultMetaPicture: String, defaultMetaTitle: String, defaultMetaDescription: String): BackendSettingLinksType
  }
`

export default applicationType