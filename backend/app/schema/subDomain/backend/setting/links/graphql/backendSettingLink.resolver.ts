import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingLinkMain from "../main/backendSettingLink.main";

const backendSettingLinkGqlResolver = {
  Query: {
    backendSettingLink_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingLinkMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingLink_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingLinkMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        title: args.title,
        description: args.description,
        image: args.image,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingLinkGqlResolver;