import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerPublishMain from "../main/backendSiteDesignerPublish.main";
import makeBackendSiteDesignerPublishRecordMain from "../main/backendSiteDesignerPublishRecord.main";

const backendSiteDesignerPublishResolver = {
  Query: {
    backendSiteDesignerPublishRecord_getManyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPublishRecordMain(ctx.d)

      const response = await main.getManyWithPagination({
        page: args.page,
        pageSize: args.pageSize,
        q: args.q,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSiteDesignerPublish_publishSite: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPublishMain(ctx.d)

      const response = await main.publishSite()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },

  },
};

export default backendSiteDesignerPublishResolver;