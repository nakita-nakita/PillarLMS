import gql from "graphql-tag"

const userType = gql`
  type GlobalSuccessType {
    success: Boolean
  }
  
  type ReturningSuccessObj {
    success: Boolean
    result: Boolean
  }


  type quillRange {
    index: Int!
    length: Int!
  }

  type SelectionCursor {
    order: Int
    userId: String
    username: String
    userColor: String
    range: quillRange
  }

  # real time adapters
  type RealTimeTextField {
    order: Int,
    name: String,
    textValue: String,
    selections: [SelectionCursor]
  }
`;
export default userType;