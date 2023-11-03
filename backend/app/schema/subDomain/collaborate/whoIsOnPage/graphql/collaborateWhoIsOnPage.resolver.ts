import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeCollaborateWhoIsOnPageMain from "../main/collaborateWhoIsOnPage.main";


const collaborateWhoIsOnPageResolver = {
  Query: {
    collaborateWhoIsOnPage_getAllUsersFromPage: async (parent, args, ctx) => {

      const main = makeCollaborateWhoIsOnPageMain(ctx.d)

      const response = await main.getAllUsersFromPage({
        url: args.url
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default collaborateWhoIsOnPageResolver