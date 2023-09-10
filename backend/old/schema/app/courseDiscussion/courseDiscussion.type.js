const gql = require("graphql-tag");
const { paginationType } = require("../../utils");

const courseDiscussionType = gql`
  enum courseOrderEnum {
    HOT
    TOP
    NEW
  }

  enum courseDiscussionVoteEnum {
    UP
    NONE
    DOWN
  }

  type CourseDiscussionMyVoteType {
    value: courseDiscussionVoteEnum
  }

  type CourseDiscussionType {
    id: ID
    title: String
    post: String
    hasBeenEdited: Boolean
    createdAt: String
    updatedAt: String
    voteTotal: Int
    commentsCount: Int
    myVote: CourseDiscussionMyVoteType
    userId: ID
    user: UserType
  }

  type CourseDiscussionCommentType {
    id: ID
    post: String
    hasBeenEdited: Boolean
    createdAt: String
    updatedAt: String
    userId: ID
    user: UserType
  }

  ${paginationType("CourseDiscussionPaginationType", "CourseDiscussionType")}
  ${paginationType("CourseDiscussionCommentPaginationType", "CourseDiscussionCommentType")}

  type Query {
    courseDiscussions(courseId: ID!, type: courseOrderEnum!, pageSize: Int, page: Int): CourseDiscussionPaginationType
    courseDiscussion(id: ID!): CourseDiscussionType
  
    courseDiscussionComments(courseDiscussionId: ID!, pageSize: Int, page: Int): CourseDiscussionCommentPaginationType
  }

  type Mutation {
    courseDiscussionAdd(courseId: ID!, title: String!, post: String!): CourseDiscussionType
    courseDiscussionUpdate(id: ID!, title: String!, post: String!): CourseDiscussionType
    courseDiscussionDelete(id: ID!): CourseDiscussionType

    courseDiscussionSetMyVote(courseDiscussionId: ID!, vote: courseDiscussionVoteEnum!) : CourseDiscussionMyVoteType

    courseDiscussionCommentAdd(courseDiscussionId: ID!, post: String!): CourseDiscussionCommentType
    courseDiscussionCommentUpdate(id: ID!, post: String!): CourseDiscussionCommentType
    courseDiscussionCommentDelete(id: ID!): CourseDiscussionCommentType
  }
`;
module.exports = courseDiscussionType;

    // courseDiscussionGetTotalVote(courseDiscussionId: ID!) : CourseDiscussionMyVoteType
    // courseDiscussionGetMyVote(courseDiscussionId: ID!) : CourseDiscussionMyVoteType
