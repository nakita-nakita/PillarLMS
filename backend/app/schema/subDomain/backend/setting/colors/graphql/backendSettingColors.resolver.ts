import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingColorsMain from "../main/backendSettingColors.main";


const backendSettingColorsGqlResolver = {
  Query: {
    backendSettingColors_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingColorsMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data?.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSettingColors_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingColorsMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingColors_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingColorsMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        color1: args.color1,
        color1Light1: args.color1Light1,
        color1Light2: args.color1Light2,
        color1Light3: args.color1Light3,
        color1Light4: args.color1Light4,
        color1Dark1: args.color1Dark1,
        color1Dark2: args.color1Dark2,
        color1Dark3: args.color1Dark3,
        color1Dark4: args.color1Dark4,
        color2: args.color2,
        color2Light1: args.color2Light1,
        color2Light2: args.color2Light2,
        color2Light3: args.color2Light3,
        color2Light4: args.color2Light4,
        color2Dark1: args.color2Dark1,
        color2Dark2: args.color2Dark2,
        color2Dark3: args.color2Dark3,
        color2Dark4: args.color2Dark4,
        color3: args.color3,
        color3Light1: args.color3Light1,
        color3Light2: args.color3Light2,
        color3Light3: args.color3Light3,
        color3Light4: args.color3Light4,
        color3Dark1: args.color3Dark1,
        color3Dark2: args.color3Dark2,
        color3Dark3: args.color3Dark3,
        color3Dark4: args.color3Dark4,
        color4: args.color4,
        color4Light1: args.color4Light1,
        color4Light2: args.color4Light2,
        color4Light3: args.color4Light3,
        color4Light4: args.color4Light4,
        color4Dark1: args.color4Dark1,
        color4Dark2: args.color4Dark2,
        color4Dark3: args.color4Dark3,
        color4Dark4: args.color4Dark4,
        color5: args.color5,
        color5Light1: args.color5Light1,
        color5Light2: args.color5Light2,
        color5Light3: args.color5Light3,
        color5Light4: args.color5Light4,
        color5Dark1: args.color5Dark1,
        color5Dark2: args.color5Dark2,
        color5Dark3: args.color5Dark3,
        color5Dark4: args.color5Dark4,
        color6: args.color6,
        color6Light1: args.color6Light1,
        color6Light2: args.color6Light2,
        color6Light3: args.color6Light3,
        color6Light4: args.color6Light4,
        color6Dark1: args.color6Dark1,
        color6Dark2: args.color6Dark2,
        color6Dark3: args.color6Dark3,
        color6Dark4: args.color6Dark4,
        color7: args.color7,
        color7Light1: args.color7Light1,
        color7Light2: args.color7Light2,
        color7Light3: args.color7Light3,
        color7Light4: args.color7Light4,
        color7Dark1: args.color7Dark1,
        color7Dark2: args.color7Dark2,
        color7Dark3: args.color7Dark3,
        color7Dark4: args.color7Dark4,
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

export default backendSettingColorsGqlResolver
