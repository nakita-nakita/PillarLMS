import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerSettingMain from "../main/backendSiteDesignerSetting.main";
import makeBackendSiteDesignerSettingReadAccessMain from "../main/backendSiteDesignerSetting_readAccess.main";
import makeBackendSiteDesignerSettingSettingAccessMain from "../main/backendSiteDesignerSetting_settingAccess.main";
import makeBackendSiteDesignerSettingUpdateAccessMain from "../main/backendSiteDesignerSetting_updateAccess.main";

const backendSiteSettingGqlResolver = {
  Query: {
    backendSiteDesignerSetting_getOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_readAccess_getAll: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingReadAccessMain(ctx.d)

      const response = await main.getAll()

      if (response?.success) {
        return response.data.map(res => res.dataValues)

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_settingAccess_getAll: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingSettingAccessMain(ctx.d)

      const response = await main.getAll()

      if (response?.success) {
        return response.data.map(res => res.dataValues)

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_updateAccess_getAll: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingUpdateAccessMain(ctx.d)

      const response = await main.getAll()

      if (response?.success) {
        return response.data.map(res => res.dataValues)

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {

    backendSiteDesignerSetting_updateOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingMain(ctx.d)

      const response = await main.updateOne({
        canAllRead: args.canAllRead,
        canAllUpdate: args.canAllUpdate,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_readAccess_setList: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingReadAccessMain(ctx.d)

      const response = await main.setList(args.list)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_settingAccess_setList: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingSettingAccessMain(ctx.d)

      const response = await main.setList(args.list)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_updateAccess_setList: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerSettingUpdateAccessMain(ctx.d)

      const response = await main.setList(args.list)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  }
};

export default backendSiteSettingGqlResolver;