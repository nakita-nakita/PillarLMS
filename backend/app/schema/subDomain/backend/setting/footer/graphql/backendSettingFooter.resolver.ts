import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingFooterMain from "../main/backendSettingFooter.main";
import makeBackendSettingFooterBuiltInMain from "../main/backendSettingFooterBuiltIn.main";

const backendSettingFooterGqlResolver = {
  Query: {
    backendSettingFooterBuiltIn_getMany: async (parent, args, ctx) => {

      const main = makeBackendSettingFooterBuiltInMain(ctx.d)

      const response = await main.getMany()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingFooter_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingFooterMain(ctx.d)

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

export default backendSettingFooterGqlResolver;