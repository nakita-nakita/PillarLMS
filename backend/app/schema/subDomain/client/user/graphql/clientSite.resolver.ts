import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeClientUserMain from "../main/clientUser.main";

const clientSiteResolver = {
  Query: {
    clientUser_getOneById: async (parent, args, ctx) => {
      const main = makeClientUserMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientUser_getManyWithPagination: async (parent, args, ctx) => {
      const main = makeClientUserMain(ctx.d)

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

    
  },
  Mutation: {
    clientUser_addOne: async (parent, args, ctx) => {
      const main = makeClientUserMain(ctx.d)

      const response = await main.addOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientUser_updateOne: async (parent, args, ctx) => {
      const main = makeClientUserMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    clientUser_deleteOne: async (parent, args, ctx) => {
      const main = makeClientUserMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  }
};

export default clientSiteResolver;