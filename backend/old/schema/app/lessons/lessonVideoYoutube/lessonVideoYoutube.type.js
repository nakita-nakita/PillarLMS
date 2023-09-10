const gql = require("graphql-tag");
const { paginationType } = require("../../../utils");

const courseType = gql`

  ${paginationType("CoursePaginationType", "CourseType")}
  
  type lessonVideoYoutubeType {
    lessonId: ID
    name: String
    isReady: Boolean
    youtubeVideoId: ID
  }


  type Query {
    lessonVideoYoutube(lessonId: ID!): lessonVideoYoutubeType
  }
  type Mutation {
    lessonVideoYoutubeUpdate(lessonId: ID!, name: String, isReady: Boolean, youtubeVideoId: ID): lessonVideoYoutubeType
  }
`;
module.exports = courseType;