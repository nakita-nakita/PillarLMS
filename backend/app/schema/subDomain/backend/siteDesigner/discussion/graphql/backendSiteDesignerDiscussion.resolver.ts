import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerDiscussionMain from "../main/backendSiteDesignerDiscussion.main";
import makeBackendSiteDesignerDiscussionCommentMain from "../main/backendSiteDesignerDiscussionComment.main";
import makeBackendSiteDesignerDiscussionVoteMain from "../main/backendSiteDesignerDiscussionVote.main";
import makeBackendUserMain from "../../../user/main/backendUser.main";
import makeBackendUserBasicViewMain from "../../../user/main/backendUserBasicView.main";
import { convertNumberToVote } from "../preMain/scripts/discussionVoteSql/_utils.private";
import makeBackendSiteDesignerDiscussionCommentVoteMain from "../main/backendSiteDesignerDiscussionCommentVote.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";



const makeDObj = async (): Promise<d_allDomain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const domainTransaction = await domainDb.transaction();
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const backendDiscussionVoteGqlResolver = {
  Query: {
    backendSiteDesignerDiscussion_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.getManyWithPagination({
        page: args.page,
        pageSize: args.pageSize,
        type: args.type,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()

        response.data.rows = response.data.rows.map(r => r.dataValues)
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },


    backendSiteDesignerDiscussionComment_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.getManyWithPagination({
        discussionId: args.discussionId,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        
        response.data.rows = response.data.rows.map(r => r.dataValues)
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionVote_getMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.getMyVote({
        discussionId: args.discussionId,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return convertNumberToVote(response.data.dataValues.vote)

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionVote_getTotalVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.getTotalVote({
        discussionId: args.discussionId,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_getMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(d)

      const response = await main.getMyVote({
        commentId: args.commentId,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return convertNumberToVote(response.data.dataValues.vote)

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_getTotalVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(d)

      const response = await main.getTotalVote({
        commentId: args.commentId,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },



  },
  Mutation: {
    backendSiteDesignerDiscussion_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.addOne({
        post: args.post,
        title: args.title,
        userId: ctx.user.id
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussion_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
        title: args.title,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.addOne({
        discussionId: args.discussionId,
        post: args.post,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionComment_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerDiscussionCommentVote_setMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(d)

      const response = await main.setMyVote({
        commentId: args.commentId,
        userId: ctx.user.id,
        vote: args.vote,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },

    backendSiteDesignerDiscussionVote_setMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.setMyVote({
        discussionId: args.discussionId,
        userId: ctx.user.id,
        vote: args.vote,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  // expanding types
  SiteDesignerDiscussionType: {
    myVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.getMyVote({
        discussionId: parent.id,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return convertNumberToVote(response.data?.dataValues?.vote || 0)

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    user: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserBasicViewMain(d)

      const response = await main.them({
        id: parent.userId
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  SiteDesignerDiscussionCommentType: {
    myVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      
      const main = makeBackendSiteDesignerDiscussionCommentVoteMain(d)

      const response = await main.getMyVote({
        commentId: parent.id,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return convertNumberToVote(response.data?.dataValues?.vote || 0)

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    user: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserBasicViewMain(d)

      const response = await main.them({
        id: parent.userId
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    }
  },
};

export default backendDiscussionVoteGqlResolver