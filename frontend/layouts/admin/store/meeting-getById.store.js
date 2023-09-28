import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getMeetingById = ({id}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!) {
        collaborateMeeting_getMeetingById(id: $id) {
          id
          name
          url
          leader {
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
          users {
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
      }
      `,
      variables: {id}
    })

    //clean up
    resolve(response?.data)
  })
}

