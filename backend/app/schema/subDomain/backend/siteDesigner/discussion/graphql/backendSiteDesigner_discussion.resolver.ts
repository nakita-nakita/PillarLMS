import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerDiscussionMain from "../main/backendSiteDesigner_discussion.main";
import makeBackendSiteDesignerDiscussionCommentMain from "../main/backendSiteDesigner_discussionComment.main";
import makeBackendSiteDesignerDiscussionVoteMain from "../main/backendSiteDesigner_discussionVote.main";



const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const backendDiscussionVoteGqlResolver = {
  Query: {
    backendSiteDesigner_discussion_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussion_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.getManyWithPagination({
        page: args.page,
        pageSize: args.pageSize,
        type: args.type,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionComment_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },


    backendSiteDesigner_discussionComment_getMany: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.getMany({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionVote_getMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.getMyVote({
        discussionId: args.discussionId,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionVote_getTotalVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.getTotalVote({
        discussionId: args.discussionId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },



  },
  // BackendRoleType: {
  //   permission_getAll: async (parent, args, ctx) => {

  //     const d = await makeDObj()
  //     const main = makeBackendRoleManyPermissionMain(d)

  //     const response = await main.getAll({
  //       roleId: parent.id,
  //     })

  //     if (response?.success) {
  //       d.subDomainTransaction.commit()
  //       return response.data

  //     } else {
  //       d.subDomainTransaction.rollback()
  //       return graphqlError(response)
  //     }
  //   },
  // },
  Mutation: {
    backendSiteDesigner_discussion_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.addOne({
        post: args.post,
        title: args.title,
        userId: ctx.user.id
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussion_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussion_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionMain(d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
        title: args.title,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionComment_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.addOne({
        discussionId: args.discussionId,
        post: args.post,
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionComment_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionComment_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionCommentMain(d)

      const response = await main.updateOne({
        id: args.id,
        post: args.post,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_discussionVote_setMyVote: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerDiscussionVoteMain(d)

      const response = await main.setMyVote({
        discussionId: args.discussionId,
        userId: args.userId,
        vote: args.vote,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  }
};

export default backendDiscussionVoteGqlResolver