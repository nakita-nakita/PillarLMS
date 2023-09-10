import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const backendSiteDesigner_pageType = gql`

  ${paginationType("BackendSiteDesigner_pagePaginationType", "BackendSiteDesigner_pageType")}

  type BackendSiteDesigner_pageType {
    id: ID
    nickname: String
    version: String, 
    isReady: Boolean,
    dataJSON: String
  }
  
  type Query {
    backendSiteDesigner_page_getOneById(id: ID): BackendSiteDesigner_pageType
    backendSiteDesigner_page_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesigner_pagePaginationType
  }

  type Mutation {
    backendSiteDesigner_page_addOne(nickname: String!, version: String!, dataJSON: String!, isReady: Boolean): BackendSiteDesigner_pageType
    backendSiteDesigner_page_updateOne(id: ID!, nickname: String, version: String, dataJSON: String, isReady: Boolean): BackendSiteDesigner_pageType
    backendSiteDesigner_page_deleteOne(id: ID!): BackendSiteDesigner_pageType
  }
`;
export default backendSiteDesigner_pageType;
