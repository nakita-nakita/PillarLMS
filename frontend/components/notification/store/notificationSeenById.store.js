import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const setNotificationSeenByIdGraphQL = ({id}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!) {
        backendNotification_hasBeenSeenById(id: $id) {
          success
        }
      }
      `,
      variables: {id}
    })

    //clean up
    resolve(response?.data)
  })
}


