import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendSettingHeaderMain from "../main/backendSettingHeader.main";
import makeBackendSettingHeaderBuiltInMain from "../main/backendSettingHeaderBuiltIn.main";

const backendSettingHeaderGqlResolver = {
  Query: {
    backendSettingHeader_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingHeaderMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
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
    backendSettingHeader_selectHeader: async (parent, args, ctx) => {

      const main = makeBackendSettingHeaderMain(ctx.d)

      const response = await main.selectHeader({
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

export default backendSettingHeaderGqlResolver;