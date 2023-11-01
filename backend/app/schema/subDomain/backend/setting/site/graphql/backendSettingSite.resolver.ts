import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingSiteMain from "../main/backendSettingSite.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";

const makeDObj = async (): Promise<d_allDomain> => {
  const domainDb: Sequelize = await emptyTestDomainDb()
  const domainTransaction = await domainDb.transaction()
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    subDomainDb,
    subDomainTransaction,
    errorHandler: sequelizeErrorHandler,
    loggers: [console],
  }
}

const backendSettingSiteGqlResolver = {
  Query: {
    backendSettingSite_getOneRealTime: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingSiteMain(d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
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
  Mutation: {
    backendSettingSite_upsertOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingSiteMain(d)

      const response = await main.upsertOne({
        id: args.id,
        favicon: args.favicon,
        tab: args.tab,
        isReady: args.isReady,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingSiteGqlResolver
