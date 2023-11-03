import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerPageMain from "../main/backendSiteDesigner_page.main";

const permissionResolver = {
  Query: {
    backendSiteDesigner_page_getOneById: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.getOneById({
        id: args.id
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesigner_page_getManyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data.rows.map(result => ({
          ...result,
          dataJSON: JSON.stringify(result.dataValues.data)
        }))

      } else {
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendSiteDesigner_page_addOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.addOne({
        data: args.dataJSON ? JSON.parse(args.dataJSON) : undefined,
        nickname: args.nickname,
        version: args.version,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesigner_page_updateOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        data: args.data,
        nickname: args.nickname,
        version: args.version,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesigner_page_deleteOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    }
  },
};

export default permissionResolver;