import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendSettingFooterMain from "../main/backendSettingFooter.main";
import makeBackendSettingFooterBuiltInMain from "../main/backendSettingFooterBuiltIn.main";

const backendSettingFooterGqlResolver = {
  Query: {
    backendSettingFooter_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingFooterMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
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
        userAnswers: args.userAnswers,
        isReady: args.isReady,
        selectionType: args.selectionType,
        selectionId: args.selectionId,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSettingFooter_selectFooter: async (parent, args, ctx) => {

      const main = makeBackendSettingFooterMain(ctx.d)

      const response = await main.selectFooter({
        id: args.id,
        type: args.type,
        socketId: args.socketId
      }).catch(error => console.log(error)) as returningSuccessObj<any>

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingFooterGqlResolver;