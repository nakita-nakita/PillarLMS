import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingHeaderMain from "../main/backendSettingHeader.main";
import makeBackendSettingHeaderBuiltInMain from "../main/backendSettingHeaderBuiltIn.main";

const backendSettingHeaderGqlResolver = {
  Query: {
    backendSettingHeaderBuiltIn_getMany: async (parent, args, ctx) => {

      const main = makeBackendSettingHeaderBuiltInMain(ctx.d)

      const response = await main.getMany()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingHeader_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingHeaderMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        webAssetImport: args.webAssetImport,
        menuJsonB: args.menuJsonB,
        userAnswersJsonB: args.userAnswersJsonB,
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

export default backendSettingHeaderGqlResolver;