import gql from "graphql-tag"

const userType = gql`
  type GlobalSuccessType {
    success: Boolean
  }
  
  type ReturningSuccessObj {
    success: Boolean
    result: Boolean
  }
`;
export default userType;