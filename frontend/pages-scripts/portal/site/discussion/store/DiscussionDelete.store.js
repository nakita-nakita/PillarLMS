import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussion_deleteOne_GraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!) {
        backendSiteDesignerDiscussion_deleteOne(id: $id) {
          success
        }
      }
      `,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}

