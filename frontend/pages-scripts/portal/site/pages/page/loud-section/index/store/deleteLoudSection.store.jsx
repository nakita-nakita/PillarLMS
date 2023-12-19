import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const deleteLoudSectionGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!) {
        backendSiteDesignerPageSectionLoud_deleteOne(id: $id) {
          success
        }
      }
      `,
      variables: { id }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

