import gql from "graphql-tag"
import { paginationType } from "../../../../../utils";

const siteDesignerDiscussionType = gql`
  enum discussionOrderEnum {
    TOP
    NEW
    # This functionality will be built in later.
    # HOT
  }

  enum siteDesignerDiscussionVoteEnum {
    UP
    NONE
    DOWN
  }


  type SiteDesignerDiscussionType {
    id: ID
    title: String
    post: String
    hasBeenEdited: Boolean
    createdAt: String
    updatedAt: String
    voteTotal: Int
    myVote: siteDesignerDiscussionVoteEnum
    user: UserDisplay
    commentsCount: Int
  }

  type SiteDesignerDiscussionCommentType {
    id: ID
    post: String
    hasBeenEdited: Boolean
    createdAt: String
    updatedAt: String
    voteTotal: Int
    myVote: siteDesignerDiscussionVoteEnum
    user: UserDisplay
  }

  ${paginationType("SiteDesignerDiscussionPaginationType", "SiteDesignerDiscussionType")}
  ${paginationType("SiteDesignerDiscussionCommentPaginationType", "SiteDesignerDiscussionCommentType")}

  type Query {
    backendSiteDesignerDiscussion_getOneById(id: ID!): SiteDesignerDiscussionType
    backendSiteDesignerDiscussion_getManyWithPagination(type: discussionOrderEnum!, pageSize: Int, page: Int): SiteDesignerDiscussionPaginationType
  
    backendSiteDesignerDiscussionComment_getOneById(id: ID!): SiteDesignerDiscussionCommentType
    backendSiteDesignerDiscussionComment_getManyWithPagination(discussionId: ID!, page: Int, pageSize: Int): SiteDesignerDiscussionCommentPaginationType
  
    backendSiteDesignerDiscussionVote_getMyVote(discussionId: ID!): siteDesignerDiscussionVoteEnum
    backendSiteDesignerDiscussionVote_getTotalVote(discussionId: ID!): Int

    backendSiteDesignerDiscussionCommentVote_getMyVote(commentId: ID!): siteDesignerDiscussionVoteEnum
    backendSiteDesignerDiscussionCommentVote_getTotalVote(commentId: ID!): Int

  }

  type Mutation {
    backendSiteDesignerDiscussion_addOne(title: String!, post: String!): SiteDesignerDiscussionType
    backendSiteDesignerDiscussion_deleteOne(id: ID!): GlobalSuccessType
    backendSiteDesignerDiscussion_updateOne(id: ID!, title: String, post: String): SiteDesignerDiscussionType

    backendSiteDesignerDiscussionComment_addOne(discussionId: ID!, post: String!): SiteDesignerDiscussionCommentType
    backendSiteDesignerDiscussionComment_deleteOne(id: ID!): GlobalSuccessType
    backendSiteDesignerDiscussionComment_updateOne(id: ID!, post: String): SiteDesignerDiscussionCommentType
    
    backendSiteDesignerDiscussionCommentVote_setMyVote(commentId: ID!, vote: siteDesignerDiscussionVoteEnum!) : GlobalSuccessType
    backendSiteDesignerDiscussionVote_setMyVote(discussionId: ID!, vote: siteDesignerDiscussionVoteEnum!) : GlobalSuccessType
  }
`;
export default siteDesignerDiscussionType;
