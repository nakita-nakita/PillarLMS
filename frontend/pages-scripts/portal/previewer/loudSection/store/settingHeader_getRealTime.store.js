import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingLoudSectionRealTimeGraphQL = ({ socketId, pageId, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!, $socketId: ID!) {
        backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId(
          pageId: $pageId,
          socketId: $socketId
        ) {
          entity
          name
          author
          webAssetImport
          userAnswersJsonB
        }
      }
      
      `,
      variables: { socketId, pageId, }
    })

    //clean up
    resolve(response?.data)
  })
}

