import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerPublishMain from "../main/backendSiteDesignerPublish.main";

const backendSiteDesignerPublishResolver = {
  Query: {
    backendSiteDesignerPublish_publishSite: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPublishMain(ctx.d)

      const response = await main.publishSite()

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },

  },
};

export default backendSiteDesignerPublishResolver;