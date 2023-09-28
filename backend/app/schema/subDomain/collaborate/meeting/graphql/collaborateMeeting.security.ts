import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendMeetingSecurity = {
  Query: {
    collaborateMeeting_getAllMeetings: isAuthenticated,
    collaborateMeeting_getMeetingById: isAuthenticated,
    collaborateMeeting_getMeetingsForUrl: isAuthenticated,
    collaborateMeeting_getUsersForMeeting: isAuthenticated,
    collaborateMeeting_getOnlineUsersNotInMeeting: isAuthenticated,
  },
}

export default backendMeetingSecurity