import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getTopNotificationsGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      
      {
        backendNotification_getFirstByCount {
          id
          message
          hasBeenSeen
          hasBeenClicked
          action
          createdAt
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}

