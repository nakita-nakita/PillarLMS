import gql from "graphql-tag"

const applicationType = gql`

  type BackendOrganizationType {
    id: String
    entity: String,
    logo: String,
    name: RealTimeTextField,
    shouldApplyToTopNavMenu: Boolean,
    addressLine1: RealTimeTextField,
    addressLine2: RealTimeTextField,
    cityLocality: RealTimeTextField,
    stateProvinceRegion: RealTimeTextField,
    postalCode: RealTimeTextField,
    socialFacebook: RealTimeTextField,
    socialX: RealTimeTextField,
    socialInstagram: RealTimeTextField,
    socialLinkedIn: RealTimeTextField,
    socialYouTube: RealTimeTextField,
    socialPinterest: RealTimeTextField,
    socialWhatsapp: RealTimeTextField,
    socialReddit: RealTimeTextField,
    createdAt: String,
  }

  type Query {
    backendSettingOrganization_getOne(socketId: String): BackendOrganizationType
  }
  type Mutation {
    backendSettingOrganization_updateOne(id: ID!, logo: String, name: String, shouldApplyToTopNavMenu: Boolean, addressLine1: String addressLine2: String, cityLocality: String, stateProvinceRegion: String, postalCode: String, socialFacebook: String, socialX: String, socialInstagram: String, socialLinkedIn: String, socialYouTube: String, socialPinterest: String, socialWhatsapp: String, socialReddit: String): BackendOrganizationType
  }
`

export default applicationType
