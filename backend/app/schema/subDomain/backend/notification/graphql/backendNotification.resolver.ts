import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../utils/types/dependencyInjection.types";
import makeBackendNotificationMain from "../main/backendNotification.main";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";

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

const backendNotificationGqlResolver = {
  Query: {
    backendNotification_getOneById: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

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
    backendNotification_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
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
    backendNotification_getFirstByCount: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.getFirstByCount({
        userId: ctx.user.id,
        count: args.count,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendNotification_getUnseenNotificationCount: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.getUnseenNotificationCount({
        userId: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendNotification_hasBeenClicked: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.hasBeenClick({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendNotification_hasBeenSeen: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.hasBeenSeen({
        userId: ctx.user.id
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendNotification_hasBeenSeenById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendNotificationMain(d)

      const response = await main.hasBeenSeenById({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
};

export default backendNotificationGqlResolver