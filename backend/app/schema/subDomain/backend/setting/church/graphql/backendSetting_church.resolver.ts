import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingChurchMain from "../main/backendSetting_church.main";

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

const settingRequestResolver = {
  Query: {
    backendSetting_church_getOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingChurchMain(d)

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
    backendSetting_church_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingChurchMain(d)

      const response = await main.updateOne({
        logo: args.logo,
        streetAddress: args.streetAddress,
        suiteNumber: args.suiteNumber,
        zipCode: args.zipCode,
        city: args.city,
        state: args.state,
        socialTwitter: args.socialTwitter,
        socialFacebook: args.socialFacebook,
        socialInstagram: args.socialInstagram,
        socialWhatsapp: args.socialWhatsapp,
        socialTelegram: args.socialTelegram,
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
};
export default settingRequestResolver;
