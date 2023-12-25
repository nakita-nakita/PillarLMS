import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const clientSitePageType = gql`

  # =====================================
  # Colors
  # =====================================

  type ClientSiteColorsType {    
    id: String
    color1: String
    color1Light1: String
    color1Light2: String
    color1Light3: String
    color1Light4: String
    color1Dark1: String
    color1Dark2: String
    color1Dark3: String
    color1Dark4: String
    color2: String
    color2Light1: String
    color2Light2: String
    color2Light3: String
    color2Light4: String
    color2Dark1: String
    color2Dark2: String
    color2Dark3: String
    color2Dark4: String
    color3: String
    color3Light1: String
    color3Light2: String
    color3Light3: String
    color3Light4: String
    color3Dark1: String
    color3Dark2: String
    color3Dark3: String
    color3Dark4: String
    color4: String
    color4Light1: String
    color4Light2: String
    color4Light3: String
    color4Light4: String
    color4Dark1: String
    color4Dark2: String
    color4Dark3: String
    color4Dark4: String
    color5: String
    color5Light1: String
    color5Light2: String
    color5Light3: String
    color5Light4: String
    color5Dark1: String
    color5Dark2: String
    color5Dark3: String
    color5Dark4: String
    color6: String
    color6Light1: String
    color6Light2: String
    color6Light3: String
    color6Light4: String
    color6Dark1: String
    color6Dark2: String
    color6Dark3: String
    color6Dark4: String
    color7: String
    color7Light1: String
    color7Light2: String
    color7Light3: String
    color7Light4: String
    color7Dark1: String
    color7Dark2: String
    color7Dark3: String
    color7Dark4: String
  }

  # =====================================
  # Footer
  # =====================================

  type ClientSiteFooterType {
    id: String,
    webAssetImport: String,
    userAnswersJsonB: String,
  }

  # =====================================
  # Footer
  # =====================================

  type ClientSiteHeaderType {
    id: String,
    webAssetImport: String,
    userAnswersJsonB: String,
  }

  # =====================================
  # Link
  # =====================================

  type ClientSiteLinkType {
    id: String,
    title: String,
    description: String,
    image: String,
  }

  # =====================================
  # Organization
  # =====================================

  type ClientSiteOrganizationType {
    # main email / main phone
    id: String
    logo: String,
    name: String,
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

  # =====================================
  # Browser
  # =====================================

  type ClientSiteBrowserType {
    id: String,
    favicon: String
    tab: String
  }
  




  # =====================================
  # Page
  # =====================================

  type ClientSitePageType {
    id: ID
    slug: String
    name: String
  }

  # =====================================
  # Page Meta
  # =====================================

  type ClientSitePageBrowser {
    id: ID
    tabName: String
    pageId: ID
  }

  type ClientSitePageLink {
    id: ID
    pageId: ID
    title: String
    description: String
    picture: String
    pictureAlt: String
  }

  # =====================================
  # Page Sections
  # =====================================

  type ClientSitePageSectionLoudType {
    id: ID
    webAssetImport: String
    userAnswersJsonB: String
    pageId: ID
  }

  type ClientSitePageSectionNormalType {
    id: ID
    webAssetImport: String
    userAnswersJsonB: String
    pageId: ID
  }




  type Query {
    # colors
    clientSiteColors_getOne: ClientSiteColorsType

    # footer
    clientSiteFooter_getOne: ClientSiteFooterType

    # header
    clientSiteHeader_getOne: ClientSiteHeaderType

    # link
    clientSiteLink_getOne: ClientSiteLinkType

    # organization
    clientSiteOrganization_getOne: ClientSiteOrganizationType

    # browser
    clientSiteBrowser_getOne: ClientSiteBrowserType


    # page
    clientSitePage_getOneById(id: ID!): ClientSitePageType
    clientSitePage_getOneBySlug(slug: String!): ClientSitePageType

    # page meta
    clientSitePageBrowser_getOneByPageId(pageId: ID!): ClientSitePageBrowser
    clientSitePageLink_getOneByPageId(pageId: ID!): ClientSitePageLink

    # page sections
    clientSitePageSectionLoud_getOneByPageId(pageId: ID!): ClientSitePageSectionLoudType
    clientSitePageSectionNormal_getManyByPageId(pageId: ID!): [ClientSitePageSectionNormalType]
    
  }
`;
export default clientSitePageType;
