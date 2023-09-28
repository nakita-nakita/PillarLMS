import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getGetAllMeetingsGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        collaborateMeeting_getAllMeetings {
          id
          name
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}

