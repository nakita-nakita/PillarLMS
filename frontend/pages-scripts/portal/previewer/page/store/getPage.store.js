import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getPageGraphQL = ({ pageId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!) {
        backendSiteDesignerPageSectionNormal_getManyByPageId(pageId: $pageId) {
          webAssetImport
          userAnswersJsonB
        }
        backendSiteDesignerPageSectionLoud_getOneByPageId(pageId: $pageId) {
          webAssetImport
          userAnswersJsonB
        }
      }
      
      
      `,
      variables: { pageId }
    })

    //clean up
    resolve(response?.data)
  })
}

