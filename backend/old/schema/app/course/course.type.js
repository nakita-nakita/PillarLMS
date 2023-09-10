const gql = require("graphql-tag");
const { paginationType } = require("../../utils");

const courseType = gql`

  ${paginationType("CoursePaginationType", "CourseType")}

  type CourseType {
    id: ID
    name: String
    description: String
  }
  
  input CourseInput {
    id: ID
    name: String
    description: String
  }

  type Query {
    course(id: ID): CourseType
    courseMany(q: String, page: Int, pageSize: Int): CoursePaginationType
  }
  type Mutation {
    courseAdd(name: String!, description: String): CourseType
    courseUpdate(id: ID!, name: String, description: String): CourseType
    courseDelete(id: ID!): CourseType
  }
`;
module.exports = courseType;