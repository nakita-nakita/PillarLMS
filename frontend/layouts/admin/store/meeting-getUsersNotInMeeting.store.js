import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getUsersNotInMeetingGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!) {
        collaborateMeeting_getOnlineUsersNotInMeeting(id: $id) {
          id
          email
          firstName
          lastName
          username
          picture
          callByType
          circleColor
          labelColor
        }
      }
      `,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}

