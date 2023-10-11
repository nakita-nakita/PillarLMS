import gql from "graphql-tag"

const applicationType = gql`

  type BackendChurchType {
    logo: String,
    streetAddress: String,
    suiteNumber: String,
    zipCode: String,
    city: String,
    state: String,
    socialTwitter: String,
    socialFacebook: String,
    socialInstagram: String,
    socialWhatsapp: String,
    socialTelegram: String
  }

  type Query {
    backendSetting_church_getOne: BackendChurchType
  }
  type Mutation {
    backendSetting_church_updateOne(logo: String, streetAddress: String, suiteNumber: String, zipCode: String, city: String, state: String, socialTwitter: String, socialFacebook: String, socialInstagram: String, socialWhatsapp: String, socialTelegram: String): BackendChurchType
  }
`

export default applicationType
