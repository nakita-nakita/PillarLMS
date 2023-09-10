const gql = require("graphql-tag");
const { paginationType } = require("../../utils");

const courseType = gql`

  ${paginationType("CoursePaginationType", "CourseType")}

  input courseSettingsInput {
    canAllCreatorsRead: Boolean
    canAllCreatorsUpdate: Boolean
    ownerId: ID
  }

  input courseAccessInput {
    userId: ID!
    courseId: ID!
  }
  
  type courseSettingResponseType {
    success: String
    message: String
  }

  type userAccessType {
    userId: String
    username: String
  }

  type Query {
    courseSettingsReadAccessUsers(courseId: ID!) : [userAccessType]
    courseSettingsUpdateAccessUsers(courseId: ID!) : [userAccessType]
    courseSettingsSettingsAccessUsers(courseId: ID!) : [userAccessType]
  }

  type Mutation {
    courseSettingsUpdate(id: ID!, courseSettings: courseSettingsInput, readAccessArray: [courseAccessInput], settingAccessArray: [courseAccessInput], updateAccessArray: [courseAccessInput]): courseSettingResponseType
  }
`;
module.exports = courseType;