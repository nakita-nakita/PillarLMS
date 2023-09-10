import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const backendSiteDesigner_pageTemplateType = gql`

  ${paginationType("BackendSiteDesigner_pageTemplatePaginationType", "BackendSiteDesigner_pageTemplateType")}

  type BackendSiteDesigner_pageTemplateType {
    id: ID
    nickname: String
    version: String, 
    isReady: Boolean,
    dataJSON: String
  }
  
  type Query {
    backendSiteDesigner_pageTemplate_getOneById(id: ID): BackendSiteDesigner_pageTemplateType
    backendSiteDesigner_pageTemplate_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesigner_pageTemplatePaginationType
  }

  type Mutation {
    backendSiteDesigner_pageTemplate_addOne(nickname: String!, version: String!, dataJSON: String!, isReady: Boolean): BackendSiteDesigner_pageTemplateType
    backendSiteDesigner_pageTemplate_updateOne(id: ID!, nickname: String, version: String, dataJSON: String, isReady: Boolean): BackendSiteDesigner_pageTemplateType
    backendSiteDesigner_pageTemplate_deleteOne(id: ID!): BackendSiteDesigner_pageTemplateType
  }
`;
export default backendSiteDesigner_pageTemplateType;
