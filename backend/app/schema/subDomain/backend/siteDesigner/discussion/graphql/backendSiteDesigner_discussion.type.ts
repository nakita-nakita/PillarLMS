import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

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
    # // user: UserType
  }

  type CourseDiscussionCommentType {
    id: ID
    post: String
    hasBeenEdited: Boolean
    createdAt: String
    updatedAt: String
    userId: ID
    # user: UserType
  }

  enum backendSiteDesignerDiscussionVoteEnum {
    UP,
    DOWN,
    NONE,
  }

  ${paginationType("CourseDiscussionPaginationType", "CourseDiscussionType")}
  ${paginationType("CourseDiscussionCommentPaginationType", "CourseDiscussionCommentType")}

  type Query {
    backendSiteDesigner_discussion_getOneById(id: ID!): CourseDiscussionType
    backendSiteDesigner_discussion_getManyWithPagination(type: courseOrderEnum!, pageSize: Int, page: Int): CourseDiscussionPaginationType
  
    backendSiteDesigner_discussionComment_getOneById(id: ID!): CourseDiscussionCommentType
    backendSiteDesigner_discussionComment_getMany(id: ID!): CourseDiscussionCommentPaginationType
  
    backendSiteDesigner_discussionVote_getMyVote(discussionId: ID!): backendSiteDesignerDiscussionVoteEnum
    backendSiteDesigner_discussionVote_getTotalVote(discussionId: ID!): backendSiteDesignerDiscussionVoteEnum
  }

  type Mutation {
    backendSiteDesigner_discussion_addOne(title: String!, post: String!): CourseDiscussionType
    backendSiteDesigner_discussion_deleteOne(id: ID!): CourseDiscussionType
    backendSiteDesigner_discussion_updateOne(id: ID!, title: String!, post: String!): CourseDiscussionType

    backendSiteDesigner_discussionComment_addOne(discussionId: ID!, post: String!): CourseDiscussionCommentType
    backendSiteDesigner_discussionComment_deleteOne(id: ID!): CourseDiscussionCommentType
    backendSiteDesigner_discussionComment_updateOne(id: ID!, post: String!): CourseDiscussionCommentType
    
    backendSiteDesigner_discussionVote_setMyVote(courseDiscussionId: ID!, vote: courseDiscussionVoteEnum!) : CourseDiscussionMyVoteType
  }
`;
export default courseDiscussionType;
