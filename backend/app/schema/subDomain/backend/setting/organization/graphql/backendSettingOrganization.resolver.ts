import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingOrganizationMain from "../main/backendSettingOrganization.main";

const settingRequestResolver = {
  Query: {
    backendSettingOrganization_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingOrganizationMain(ctx.d)

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

      const main = makeBackendSettingOrganizationMain(ctx.d)

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

      const main = makeBackendSettingOrganizationMain(ctx.d)

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
