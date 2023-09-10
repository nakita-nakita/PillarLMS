const gql = require("graphql-tag");

const courseModuleType = gql`
  enum lessonTypeEnum {
    LESSON_PAGE_BUILDER
    LESSON_PAGE_SIMPLE
    LESSON_VIDEO_YOUTUBE
    LESSON_VIDEO_VIMEO
    LESSON_QUIZ
    LESSON_EXAM
  }

  type CourseLessonType {
    id: ID
    name: String
    orderNumber: Int
    type: lessonTypeEnum
    entityReferenceId: ID
    isReady: Boolean
  }

  input CourseLessonInput {
    id: ID
    name: String
    orderNumber: Int
    isReady: Boolean
    type: lessonTypeEnum
  }

  type CourseModuleType {
    id: ID
    name: String
    orderNumber: Int
    lessons:[CourseLessonType]
  }

  input CourseModuleInput {
    id: ID
    name: String
    orderNumber: Int
    lessons: [CourseLessonInput]
  }

  type ModuleSetSuccess {
    success: Boolean
  }

  type Query {
    courseModule(courseId: ID!): [CourseModuleType]
  }

  type Mutation {
    courseModuleAddToEnd(courseId: ID!, name: String) : CourseModuleType
    courseModuleUpdateOne(id: ID!, name: String, orderNumber: Int) : CourseModuleType
    courseModuleDelete(id: ID!) : CourseModuleType
    courseModuleSet(courseId: ID!, modules: [CourseModuleInput]!): [CourseModuleType]

    courseLessonAddToEnd(courseModuleId: ID!, courseId: ID!, name: String!, type: lessonTypeEnum!) : CourseLessonType
    courseLessonUpdateOne(id: ID!, name: String, orderNumber: Int, isReady: Boolean) : CourseLessonType
    courseLessonDelete(id: ID!) : CourseLessonType
    courseLessonSet(courseModuleId: ID!, lessons: [CourseLessonInput]!) : ModuleSetSuccess
  }
`;
module.exports = courseModuleType;
