import gql from "graphql-tag"

const backendSiteDesignerPublishType = gql`
  type Query {
    backendSiteDesignerPublish_publishSite(id: ID!): GlobalSuccessType
  }
`;
export default backendSiteDesignerPublishType;
