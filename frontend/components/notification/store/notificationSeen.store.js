import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const setNotificationSeenGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation {
        backendNotification_hasBeenSeen {
          success
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}


