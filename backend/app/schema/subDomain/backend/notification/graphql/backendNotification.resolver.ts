import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendNotificationMain from "../main/backendNotification.main";


const backendNotificationGqlResolver = {
  Query: {
    backendNotification_getOneById: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendNotification_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
        userId: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendNotification_getFirstByCount: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.getFirstByCount({
        userId: ctx.user.id,
        count: args.count,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendNotification_getUnseenNotificationCount: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.getUnseenNotificationCount({
        userId: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendNotification_hasBeenClicked: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.hasBeenClick({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendNotification_hasBeenSeen: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.hasBeenSeen({
        userId: ctx.user.id
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendNotification_hasBeenSeenById: async (parent, args, ctx) => {

      const main = makeBackendNotificationMain(ctx.d)

      const response = await main.hasBeenSeenById({
        id: args.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default backendNotificationGqlResolver