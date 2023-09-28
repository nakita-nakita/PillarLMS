import gql from "graphql-tag"

const backendMeetingGqlType = gql`

  type meetingType {
    id: ID
    name: String
    url: String
    leader: UserDisplay
    users: [UserDisplay]
  }

  type Query {
    collaborateMeeting_getAllMeetings: [meetingType]
    collaborateMeeting_getMeetingById(id: ID!): meetingType
    collaborateMeeting_getMeetingsForUrl(url: String!): [meetingType] 

    collaborateMeeting_getUsersForMeeting(id: ID!): [UserDisplay]
    collaborateMeeting_getOnlineUsersNotInMeeting(id: ID!): [UserDisplay]
    
  }
`

export default backendMeetingGqlType