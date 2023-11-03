import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeFoundationUserMain from "../main/foundationUser.main";



const foundationUserResolver = {
  Query: {
    foundationUser_getOne: async (parent, args, ctx) => {
      const main = makeFoundationUserMain(ctx.d)

      const response = await main.getOneById({
        id: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    foundationUser_deactivateMe: async (parent, args, ctx) => {
      const main = makeFoundationUserMain(ctx.d)

      const response = await main.deactivateOne({
        id: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    foundationUser_reactivateMe: async (parent, args, ctx) => {
      const main = makeFoundationUserMain(ctx.d)

      const response = await main.reactivateOne({
        id: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};
export default foundationUserResolver