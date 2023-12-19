import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const normalSectionGraphQL = ({ id, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!, $socketId: ID!) {
        backendSiteDesignerPageSectionNormal_getOneRealTimeById(
          id: $id
          socketId: $socketId
        ) {
          id
          entity
          name
          webAssetImport
          menuJsonB
          userAnswersJsonB
        }
      }
      
      `,
      variables: { id, socketId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

