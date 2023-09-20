import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendPermissionGqlType = gql`

  type samePageType {
    total: Int
    users: [UserDisplay]
  }

  type Query {
    collaborateMeeting_getAllMeetings: 
    collaborateMeeting_getMeetingById(id: ID!): 

    collaborateMeeting_getUsersForMeeting(meetingId: ID!): 
    collaborateMeeting_getOnlineUsersNotInMeeting(meetingId: ID!): 
    collaborateMeeting_getOfflineUsers: 
    
    collaborateMeeting_getMeetingsOnPage(url: String!): 
    
    
  }

  type Mutation {
    collaborateMeeting_startMeeting(meetingId: ID!, userId: ID!, name: String!):
    collaborateMeeting_endMeeting(meetingId: ID!, userId: ID!):

    collaborateMeeting_changeName(meetingId: ID!, name: String!): 
    collaborateMeeting_changeLeader(meetingId: ID!, userId: ID!): 
    collaborateMeeting_kickUserFromMeeting(meetingId: ID!, userId: ID!):
    collaborateMeeting_requestUrlChange(meetingId: ID!, userId: ID!, url: String!):
    collaborateMeeting_urlChange(meetingId: ID!, userId: ID!, url: String!):
    collaborateMeeting_leaveMeeting(meetingId: ID!, userId: ID!):

  }
`

export default backendPermissionGqlType