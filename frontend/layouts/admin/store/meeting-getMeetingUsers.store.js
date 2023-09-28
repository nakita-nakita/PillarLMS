import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getMeetingUsers = ({id}) => {
  console.log('id checks out', id)
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!) {
        collaborateMeeting_getUsersForMeeting(id: $id) {
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
      variables: {id}
    })

    //clean up
    resolve(response?.data)
  })
}

