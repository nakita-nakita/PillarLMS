import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingOrganizationMain from "../main/backendSettingOrganization.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";

const makeDObj = async (): Promise<d_allDomain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  // const subDomainTransaction = await subDomainDb.transaction();

  return {
    domainDb,
    subDomainDb,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const settingRequestResolver = {
  Query: {
    backendSettingOrganization_getOneRealTime: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingOrganizationMain(d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },

    backendSettingOrganization_getOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingOrganizationMain(d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    
  },
  Mutation: {
    backendSettingOrganization_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingOrganizationMain(d)

      const response = await main.upsertOne({
        id: args.id,
        logo: args.logo,
        name: args.name,
        shouldApplyToTopNavMenu: args.shouldApplyToTopNavMenu,
        addressLine1: args.addressLine1,
        addressLine2: args.addressLine2,
        cityLocality: args.cityLocality,
        stateProvinceRegion: args.stateProvinceRegion,
        postalCode: args.postalCode,
        socialFacebook: args.socialFacebook,
        socialX: args.socialX,
        socialInstagram: args.socialInstagram,
        socialLinkedIn: args.socialLinkedIn,
        socialYouTube: args.socialYouTube,
        socialPinterest: args.socialPinterest,
        socialWhatsapp: args.socialWhatsapp,
        socialReddit: args.socialReddit,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
  },
};
export default settingRequestResolver;
