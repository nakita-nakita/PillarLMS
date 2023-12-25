import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const backendSiteDesignerPublishType = gql`

  type BackendSiteDesignerPublishRecordType {
    id: ID
    numberOfPages: Int
    createdAt: String
  }
  
  ${paginationType("BackendSiteDesignerPublishRecordPaginationType", "BackendSiteDesignerPublishRecordType")}

  type Query {
    backendSiteDesignerPublishRecord_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPublishRecordPaginationType
 
  }

  type Mutation {
    backendSiteDesignerPublish_publishSite: BackendSiteDesignerPublishRecordType
  }
`;
export default backendSiteDesignerPublishType;
