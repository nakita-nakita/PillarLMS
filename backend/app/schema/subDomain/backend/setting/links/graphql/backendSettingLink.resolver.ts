import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingLinksMain from "../main/backendSettingLink.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeBackendSettingLinkMain from "../main/backendSettingLink.main";

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

const backendSettingLinkGqlResolver = {
  Query: {
    backendSettingLink_getOneRealTime: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingLinkMain(d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
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
    backendSettingLink_upsertOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingLinkMain(d)

      const response = await main.upsertOne({
        id: args.id,
        title: args.title,
        description: args.description,
        image: args.image,
        isReady: args.isReady,
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

  },
}

export default backendSettingLinkGqlResolver;