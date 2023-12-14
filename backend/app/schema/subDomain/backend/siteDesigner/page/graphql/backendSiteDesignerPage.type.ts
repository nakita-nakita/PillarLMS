import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const backendSiteDesignerPageType = gql`

  type BackendSiteDesignerPageType {
    id: ID
    slug: String
    name: String
    isReady: Boolean,
  }

  ${paginationType("BackendSiteDesignerPagePaginationType", "BackendSiteDesignerPageType")}
  
  # =====================================
  # Browser
  # =====================================

  type backendSiteDesignerPageBrowser {
    id: ID
    tabName: String
    pageId: ID
  }

  type backendSiteDesignerPageBrowserRealTime {
    id: ID
    tabName: RealTimeTextField
    pageId: ID
    entity: String
  }

  # =====================================
  # Link
  # =====================================

  type backendSiteDesignerPageLink {
    id: ID
    pageId: ID
    title: String
    description: String
    picture: String
    pictureAlt: String
  }

  type backendSiteDesignerPageLinkRealTime {
    entity: String
    id: ID
    pageId: ID
    title: RealTimeTextField
    description: RealTimeTextField
    picture: RealTimeMediaSelection
  }

  # =====================================
  # Built-in components
  # =====================================

  enum LoudSectionEnum {
    HOMEPAGE
    NORMALPAGE
  }

  enum PageSectionEnum {
    LIST
    IMAGE
    TEXT
    OTHER
  }
  

  type backendSiteDesignerPageSectionLoudBuiltIn {
    id: String,
    category: LoudSectionEnum,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }

  type backendSiteDesignerPageSectionNormalBuiltIn {
    id: String,
    category: PageSectionEnum,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }


  type Query {
    backendSiteDesignerPage_getOneById(id: ID): BackendSiteDesignerPageType
    backendSiteDesignerPage_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType
  
    # browser
    backendSiteDesignerPageBrowser_getOneByPageId(pageId: ID!): backendSiteDesignerPageBrowser
    backendSiteDesignerPageBrowser_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): backendSiteDesignerPageBrowserRealTime

    # link
    backendSiteDesignerPageLink_getOneByPageId(pageId: ID!): backendSiteDesignerPageLink
    backendSiteDesignerPageLink_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): backendSiteDesignerPageLinkRealTime


    # built-in
    backendSiteDesignerPageSectionLoudBuiltIn_getMany:[backendSiteDesignerPageSectionLoudBuiltIn]
    backendSiteDesignerPageSectionNormalBuiltIn_getMany:[backendSiteDesignerPageSectionNormalBuiltIn]
  }

  type Mutation {
    backendSiteDesignerPage_addOne(slug: String!, name: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_updateOne(id: ID!, slug: String, name: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_deleteOne(id: ID!): BackendSiteDesignerPageType

    # browser
    backendSiteDesignerPageBrowser_upsertOne(pageId: ID!, id: ID, tabName: String): GlobalSuccessType

    # link
    backendSiteDesignerPageLink_upsertOne(pageId: ID!, id: ID, title: String, description: String, picture: String, pictureAlt: String): GlobalSuccessType

  }
`;
export default backendSiteDesignerPageType;
