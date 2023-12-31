import gql from "graphql-tag"

const applicationType = gql`

  type BackendOrganizationRealTimeType {
    id: String
    entity: String,
    logo: RealTimePictureSelection,
    name: RealTimeTextField,
    shouldApplyToTopNavMenu: RealTimeSwitch,
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

  type BackendOrganizationType {
    id: String
    logo: String,
    name: String,
    shouldApplyToTopNavMenu: Boolean,
    addressLine1: String,
    addressLine2: String,
    cityLocality: String,
    stateProvinceRegion: String,
    postalCode: String,
    socialFacebook: String,
    socialX: String,
    socialInstagram: String,
    socialLinkedIn: String,
    socialYouTube: String,
    socialPinterest: String,
    socialWhatsapp: String,
    socialReddit: String,
    createdAt: String,
  }

  type Query {
    backendSettingOrganization_getOneRealTime(socketId: String): BackendOrganizationRealTimeType
    backendSettingOrganization_getOne: BackendOrganizationType
  }
  type Mutation {
    backendSettingOrganization_updateOne(id: ID!, logo: String, name: String, shouldApplyToTopNavMenu: Boolean, addressLine1: String addressLine2: String, cityLocality: String, stateProvinceRegion: String, postalCode: String, socialFacebook: String, socialX: String, socialInstagram: String, socialLinkedIn: String, socialYouTube: String, socialPinterest: String, socialWhatsapp: String, socialReddit: String): BackendOrganizationRealTimeType
  }
`

export default applicationType
