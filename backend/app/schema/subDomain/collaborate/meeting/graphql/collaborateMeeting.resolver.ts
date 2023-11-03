import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeCollaborateMeetingMain from "../main/collaborateMeeting.main";
// import makeBackendPermissionMain from "../main/backendPermission.main";

const backendMeetingGqlResolver = {
  Query: {
    collaborateMeeting_getAllMeetings: async (parent, args, ctx) => {

      const main = makeCollaborateMeetingMain(ctx.d)

      const response = await main.getAllMeetings()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    collaborateMeeting_getMeetingById: async (parent, args, ctx) => {

      const main = makeCollaborateMeetingMain(ctx.d)

      const response = await main.getMeetingById({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    collaborateMeeting_getMeetingsForUrl: async (parent, args, ctx) => {

      const main = makeCollaborateMeetingMain(ctx.d)

      const response = await main.getMeetingsForUrl({
        url: args.url,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    collaborateMeeting_getUsersForMeeting: async (parent, args, ctx) => {

      const main = makeCollaborateMeetingMain(ctx.d)

      const response = await main.getUsersForMeeting({
        id: args.id
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    collaborateMeeting_getOnlineUsersNotInMeeting: async (parent, args, ctx) => {

      const main = makeCollaborateMeetingMain(ctx.d)

      const response = await main.getOnlineUsersNotInMeeting({
        id: args.id
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default backendMeetingGqlResolver