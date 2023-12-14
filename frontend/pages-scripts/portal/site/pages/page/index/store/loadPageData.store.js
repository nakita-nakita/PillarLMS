import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const loadPageGraphQL = ({ pageId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!) {
        backendSiteDesignerPage_getOneById(id: $pageId) {
          slug
        }
        backendSiteDesignerPageSectionLoudBuiltIn_getMany {
          id
          category
          webAssetImport
          menuJsonB
          description
          author
          authorLink
          name
        }
        backendSiteDesignerPageSectionNormalBuiltIn_getMany {
          id
          category
          webAssetImport
          menuJsonB
          description
          author
          authorLink
          name
        }
      }
      
      
      `,
      variables: { pageId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

