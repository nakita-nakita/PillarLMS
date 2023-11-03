import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendPermissionMain from "../main/backendPermission.main";


const backendPermissionGqlResolver = {
  Query: {
    backendPermission_getOneById: async (parent, args, ctx) => {

      const main = makeBackendPermissionMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendPermission_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendPermissionMain(ctx.d)

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
    backendPermission_addOne: async (parent, args, ctx) => {

      const main = makeBackendPermissionMain(ctx.d)

      const response = await main.addOne({
        name: args.name,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendPermission_updateOne: async (parent, args, ctx) => {

      const main = makeBackendPermissionMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendPermission_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendPermissionMain(ctx.d)

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

export default backendPermissionGqlResolver