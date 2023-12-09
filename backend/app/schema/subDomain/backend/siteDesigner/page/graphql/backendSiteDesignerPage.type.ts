import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const backendSiteDesignerPageType = gql`

  type BackendSiteDesignerPageType {
    id: ID
    slug: String
    isReady: Boolean,
  }

  ${paginationType("BackendSiteDesignerPagePaginationType", "BackendSiteDesignerPageType")}
  
  type Query {
    backendSiteDesignerPage_getOneById(id: ID): BackendSiteDesignerPageType
    backendSiteDesignerPage_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType
  }

  type Mutation {
    backendSiteDesignerPage_addOne(slug: String!, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_updateOne(id: ID!, slug: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_deleteOne(id: ID!): BackendSiteDesignerPageType
  }
`;
export default backendSiteDesignerPageType;
