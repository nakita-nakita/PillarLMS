import gql from "graphql-tag"

const userType = gql`
  type GlobalSuccessType {
    success: Boolean
  }
  
  type ReturningSuccessObj {
    success: Boolean
    result: Boolean
  }

  
  type UserDisplay { 
    id: ID!
    email: String
    firstName: String 
    lastName: String 
    username: String 
    picture: String 
    callByType: CallByTypeEnum 
    circleColor: String 
    labelColor: String
    displayName: String
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

  type RealTimeSwitch {
    order: Int,
    name: String,
    booleanValue: Boolean,
    user: UserDisplay
  }

  type RealTimeColorPicker {
    order: Int,
    name: String,
    color: String,
    user: UserDisplay
    colorLight1: String,
    colorLight2: String,
    colorLight3: String,
    colorLight4: String,
    colorDark1: String,
    colorDark2: String,
    colorDark3: String,
    colorDark4: String, 
  }

  type SelectionType {
    id: String
    picture: String
    user: UserDisplay
    createdAt: String
  }

  type RealTimePictureSelection {
    order: Int
    name: String
    selection: String
    currentSelection: SelectionType
    uploads: [SelectionType]
  }

  type FaviconSelectionType {
    id: String
    favicon: String
    user: UserDisplay
    createdAt: String
  }

  type RealTimeFaviconSelection {
    order: Int
    name: String
    selection: String
    currentSelection: FaviconSelectionType
    uploads: [FaviconSelectionType]
  }


`;
export default userType;