import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingSiteMain from "../main/backendSettingSite.main";

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

const backendSettingSiteGqlResolver = {
  Query: {
    backendSetting_site_getOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingSiteMain(d)

      const response = await main.getOne()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data?.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSetting_site_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingSiteMain(d)

      const response = await main.updateOne({
        churchShortName: args.churchShortName,
        favicon: args.favicon,
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
