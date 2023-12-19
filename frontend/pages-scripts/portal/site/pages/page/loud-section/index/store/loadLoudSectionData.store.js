import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const loadLoudSectionGraphQL = ({ pageId, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!, $socketId: ID!) {
        backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId(
          pageId: $pageId
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
      variables: { pageId, socketId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

