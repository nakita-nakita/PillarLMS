import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const setNotificationClickedGraphQL = ({id}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      
      mutation($id: ID!) {
        backendNotification_hasBeenClicked(id: $id) {
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


