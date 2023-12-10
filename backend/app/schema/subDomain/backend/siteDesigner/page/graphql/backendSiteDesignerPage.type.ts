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

  type Query {
    backendSiteDesignerPage_getOneById(id: ID): BackendSiteDesignerPageType
    backendSiteDesignerPage_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType
  
    # browser
    backendSiteDesignerPageBrowser_getOneByPageId(pageId: ID!): backendSiteDesignerPageBrowser
    backendSiteDesignerPageBrowser_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): backendSiteDesignerPageBrowserRealTime
  
  }

  type Mutation {
    backendSiteDesignerPage_addOne(slug: String!, name: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_updateOne(id: ID!, slug: String, name: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_deleteOne(id: ID!): BackendSiteDesignerPageType

    # browser
    backendSiteDesignerPageBrowser_upsertOne(pageId: ID!, id: ID, tabName: String): GlobalSuccessType
  }
`;
export default backendSiteDesignerPageType;
