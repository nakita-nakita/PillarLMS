import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSiteDesignerPageMain from "../main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageBrowserMain from "../main/backendSiteDesignerPageBrowser.main";
import makeBackendSiteDesignerPageLinkMain from "../main/backendSiteDesignerPageLink.main";
import makeBackendSiteDesignerPageSectionLoudMain from "../main/backendSiteDesignerPageSectionLoud.main";
import makeBackendSiteDesignerPageSectionLoudBuiltInMain from "../main/backendSiteDesignerPageSectionLoudBuiltIn.main";
import makeBackendSiteDesignerPageSectionNormalMain from "../main/backendSiteDesignerPageSectionNormal.main";
import makeBackendSiteDesignerPageSectionNormalBuiltInMain from "../main/backendSiteDesignerPageSectionNormalBuiltIn.main";

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
    backendSiteDesignerPage_getOneRealTimeById: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageMain(ctx.d)

      const response = await main.getOneRealTimeById({
        id: args.id,
        socketId: args.socketId,
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
    },
    backendSiteDesignerPageBrowser_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageBrowserMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageBrowser_getOneRealTimeByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageBrowserMain(ctx.d)

      const response = await main.getOneRealTimeByPageId({
        pageId: args.pageId,
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageLink_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageLinkMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageLink_getOneRealTimeByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageLinkMain(ctx.d)

      const response = await main.getOneRealTimeByPageId({
        pageId: args.pageId,
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionLoud_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionLoudMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionLoudMain(ctx.d)

      const response = await main.getOneRealTimeByPageId({
        pageId: args.pageId,
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_getOneById: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_getManyByPageId: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.getManyByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_getOneRealTimeById: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.getOneRealTimeById({
        sectionId: args.id,
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionLoudBuiltIn_getMany: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageSectionLoudBuiltInMain(ctx.d)

      const response = await main.getMany()

      if (response?.success) {
        return response.data.map(d => {
          const data = { ...d.dataValues }
          data.menuJsonB = JSON.stringify(d.dataValues.menuJsonB)

          return data
        })

      } else {
        return graphqlError(response)
      }
    },

    backendSiteDesignerPageSectionNormalBuiltIn_getMany: async (parent, args, ctx) => {

      const main = makeBackendSiteDesignerPageSectionNormalBuiltInMain(ctx.d)

      const response = await main.getMany()

      if (response?.success) {
        return response.data.map(d => {
          const data = { ...d.dataValues }
          data.menuJsonB = JSON.stringify(d.dataValues.menuJsonB)

          return data
        })

      } else {
        return graphqlError(response)
      }
    },



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
    },
    backendSiteDesignerPageBrowser_upsertOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageBrowserMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        pageId: args.pageId,
        tabName: args.tabName,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageLink_upsertOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageLinkMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        pageId: args.pageId,
        title: args.title,
        description: args.description,
        picture: args.picture,
        pictureAlt: args.pictureAlt,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionLoud_upsertOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionLoudMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        pageId: args.pageId,
        selectionType: args.selectionType,
        selectionId: args.selectionId,
        userAnswersJsonB: args.userAnswersJsonB,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionLoud_deleteOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionLoudMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_addOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.addOne({
        pageId: args.pageId,
        name: args.name,
        selectionType: args.selectionType,
        selectionId: args.selectionId,
        orderNumber: args.orderNumber,
        userAnswersJsonB: args.userAnswersJsonB,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_updateOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
        selectionType: args.selectionType,
        selectionId: args.selectionId,
        orderNumber: args.orderNumber,
        userAnswersJsonB: args.userAnswersJsonB,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSiteDesignerPageSectionNormal_deleteOne: async (parent, args, ctx) => {
      const main = makeBackendSiteDesignerPageSectionNormalMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },






    // backendSiteDesignerPageSectionLoud_upsertOne
    // backendSiteDesignerPageSectionLoud_deleteOne
    // backendSiteDesignerPageSectionNormal_addOne
    // backendSiteDesignerPageSectionNormal_updateOne
    // backendSiteDesignerPageSectionNormal_deleteOne
  },
};

export default backendSiteDesignerPageResolver;