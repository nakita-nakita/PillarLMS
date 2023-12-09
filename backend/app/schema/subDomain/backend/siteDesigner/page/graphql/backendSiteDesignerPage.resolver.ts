import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerPageMain from "../main/backendSiteDesignerPage.main";

const backendSiteDesignerPageResolver = {
  Query: {
    backendSiteDesignerPage_getOneById: async (parent, args, ctx) => {
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
    backendSiteDesignerPage_getManyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendSiteDesignerPage_addOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.addOne({
        slug: args.slug,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPage_updateOne: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        slug: args.slug,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPage_deleteOne: async (parent, args, ctx) => {
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

export default backendSiteDesignerPageResolver;