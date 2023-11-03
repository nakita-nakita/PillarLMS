import makeBackendSiteDesignerDiscussionMain from "../main/backendSiteDesignerDiscussion.main";
import makeBackendSiteDesignerDiscussionCommentMain from "../main/backendSiteDesignerDiscussionComment.main";
import makeBackendSiteDesignerDiscussionVoteMain from "../main/backendSiteDesignerDiscussionVote.main";
import makeBackendUserBasicViewMain from "../../../user/main/backendUserBasicView.main";
import { convertNumberToVote } from "../preMain/scripts/discussionVoteSql/_utils.private";
import makeBackendSiteDesignerDiscussionCommentVoteMain from "../main/backendSiteDesignerDiscussionCommentVote.main";
import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";


const backendDiscussionVoteGqlResolver = {
  Query: {
    backendSiteDesignerDiscussion_getOneById: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionMain(ctx.d)

      const response = await main.getManyWithPagination({
        page: args.page,
        pageSize: args.pageSize,
        type: args.type,
      })

      if (response?.success) {

        response.data.rows = response.data.rows.map(r => r.dataValues)
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_getOneById: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },


    backendSiteDesignerDiscussionComment_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentMain(ctx.d)

      const response = await main.getManyWithPagination({
        discussionId: args.discussionId,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        
        response.data.rows = response.data.rows.map(r => r.dataValues)
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionVote_getMyVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionVoteMain(ctx.d)

      const response = await main.getMyVote({
        discussionId: args.discussionId,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return convertNumberToVote(response.data.dataValues.vote)

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionVote_getTotalVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionVoteMain(ctx.d)

      const response = await main.getTotalVote({
        discussionId: args.discussionId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_getMyVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(ctx.d)

      const response = await main.getMyVote({
        commentId: args.commentId,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return convertNumberToVote(response.data.dataValues.vote)

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_getTotalVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(ctx.d)

      const response = await main.getTotalVote({
        commentId: args.commentId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },



  },
  Mutation: {
    backendSiteDesignerDiscussion_addOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionMain(ctx.d)

      const response = await main.addOne({
        post: args.post,
        title: args.title,
        userId: ctx.user.id
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_updateOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
        title: args.title,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_addOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentMain(ctx.d)

      const response = await main.addOne({
        discussionId: args.discussionId,
        post: args.post,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_updateOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_setMyVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(ctx.d)

      const response = await main.setMyVote({
        commentId: args.commentId,
        userId: ctx.user.id,
        vote: args.vote,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },

    backendSiteDesignerDiscussionVote_setMyVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionVoteMain(ctx.d)

      const response = await main.setMyVote({
        discussionId: args.discussionId,
        userId: ctx.user.id,
        vote: args.vote,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
  },
  // expanding types
  SiteDesignerDiscussionType: {
    myVote: async (parent, args, ctx) => {
      
      const main = makeBackendSiteDesignerDiscussionVoteMain(ctx.d)

      const response = await main.getMyVote({
        discussionId: parent.id,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return convertNumberToVote(response.data?.dataValues?.vote || 0)

      } else {
        return graphqlError(response)
      }
    },
    user: async (parent, args, ctx) => {

      const main = makeBackendUserBasicViewMain(ctx.d)

      const response = await main.them({
        id: parent.userId
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  SiteDesignerDiscussionCommentType: {
    myVote: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(ctx.d)

      const response = await main.getMyVote({
        commentId: parent.id,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return convertNumberToVote(response.data?.dataValues?.vote || 0)

      } else {
        return graphqlError(response)
      }
    },
    user: async (parent, args, ctx) => {

      const main = makeBackendUserBasicViewMain(ctx.d)

      const response = await main.them({
        id: parent.userId
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    }
  },
};

export default backendDiscussionVoteGqlResolver