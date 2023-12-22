import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const clientUserType = gql`

  type ClientUserType {
    id: String,
    isBlocked: String,
  }

  ${paginationType("ClientUserPaginationType", "ClientUserType")}
    
  type Query {
    # colors
    clientUser_getOneById(id: ID!): ClientUserType
    clientUser_getManyWithPagination(q: String, page: Int, pageSize: Int): ClientUserPaginationType
  }
  
  type Mutation {
    clientUser_addOne(id: ID!): ClientUserType
    clientUser_updateOne(id: ID!): ClientUserType
    clientUser_deleteOne(id: ID!): GlobalSuccessType
  }
`;
export default clientUserType;
