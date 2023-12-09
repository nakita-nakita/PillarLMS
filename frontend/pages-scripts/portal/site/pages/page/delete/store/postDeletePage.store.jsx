import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postDeletePageGraphQL = ({ id, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!) {
        backendSiteDesignerPage_deleteOne(id: $id) {
          id
        }
      }
      
      `,
      variables: { id, }
    })

    //clean up
    resolve(response?.data)
  })
}

