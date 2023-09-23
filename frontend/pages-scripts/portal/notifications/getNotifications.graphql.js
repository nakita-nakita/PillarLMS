import { callApi, callSubDomainApi } from "@/utils/graphql/backend-api"

export const getNotificationsGraphQL = ({page, pageSize}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `

      query($page: Int, $pageSize: Int) {
        backendNotification_getManyWithPagination(page: $page, pageSize: $pageSize){
          count
          page
          pageSize
          rows {
            id
            message
            hasBeenSeen
            hasBeenClicked
            action
            createdAt
          }
        }
      }
      `,
      variables: {page, pageSize}
    })

    //clean up
    resolve(response?.data)
  })
}

