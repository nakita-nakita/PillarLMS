import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeFoundationUserProfileMain from "../main/foundationUserProfile.main";





const backend_authResolver = {
  Query: {
    foundationUserProfile_getOne: async (parent, args, ctx) => {
      const main = makeFoundationUserProfileMain(ctx.d)

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
    foundationUserProfile_updateOne: async (parent, args, ctx) => {
      const main = makeFoundationUserProfileMain(ctx.d)

      const response = await main.upsertOne({
        id: ctx.user.id,
        firstName: args.firstName,
        lastName: args.lastName,
        username: args.username,
        picture: args.picture,
        callByType: args.callByType,
        circleColor: args.circleColor,
        labelColor: args.labelColor,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};
export default backend_authResolver