import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeClientSiteBrowserMain from "../main/clientSiteBrowser.main";
import makeClientSiteColorsMain from "../main/clientSiteColors.main";
import makeClientSiteFooterMain from "../main/clientSiteFooter.main";
import makeClientSiteHeaderMain from "../main/clientSiteHeader.main";
import makeClientSiteLinkMain from "../main/clientSiteLink.main";
import makeClientSiteOrganizationMain from "../main/clientSiteOrganization.main";
import makeClientSitePageMain from "../main/clientSitePage.main";
import makeClientSitePageBrowserMain from "../main/clientSitePageBrowser.main";
import makeClientSitePageLinkMain from "../main/clientSitePageLink.main";
import makeClientSitePageSectionLoudMain from "../main/clientSitePageSectionLoud.main";
import makeClientSitePageSectionNormalMain from "../main/clientSitePageSectionNormal.main";

const clientSiteResolver = {
  Query: {
    clientSiteColors_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteColorsMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSiteFooter_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteFooterMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSiteHeader_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteHeaderMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return {
          ...response.data.dataValues,
          userAnswersJsonB: JSON.stringify(response.data.dataValues.userAnswersJsonB),
        }

      } else {
        return graphqlError(response)
      }
    },
    clientSiteLink_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteLinkMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSiteBrowser_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteBrowserMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSiteOrganization_getOne: async (parent, args, ctx) => {
      const main = makeClientSiteOrganizationMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePage_getOneById: async (parent, args, ctx) => {
      const main = makeClientSitePageMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePage_getOneBySlug: async (parent, args, ctx) => {
      const main = makeClientSitePageMain(ctx.d)

      const response = await main.getOneBySlug({
        slug: args.slug,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePageBrowser_getOneByPageId: async (parent, args, ctx) => {
      const main = makeClientSitePageBrowserMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePageLink_getOneByPageId: async (parent, args, ctx) => {
      const main = makeClientSitePageLinkMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePageSectionLoud_getOneByPageId: async (parent, args, ctx) => {
      const main = makeClientSitePageSectionLoudMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientSitePageSectionNormal_getManyByPageId: async (parent, args, ctx) => {
      const main = makeClientSitePageSectionNormalMain(ctx.d)

      const response = await main.getManyByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default clientSiteResolver;