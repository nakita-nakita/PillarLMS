import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingLinksMain from "../main/backendSetting_links.main";

const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const transaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    transaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const backendSettingLinksGqlResolver = {
  Query: {
    backendSetting_links_getOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingLinksMain(d)

      const response = await main.getOne()

      if (response?.success) {
        d.transaction.commit()
        return response.data?.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSetting_links_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingLinksMain(d)

      const response = await main.updateOne({
        donationLink: args.donationLink,
        virtualServicesLink: args.virtualServicesLink,
        defaultMetaPicture: args.defaultMetaPicture,
        defaultMetaTitle: args.defaultMetaTitle,
        defaultMetaDescription: args.defaultMetaDescription,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingLinksGqlResolver;