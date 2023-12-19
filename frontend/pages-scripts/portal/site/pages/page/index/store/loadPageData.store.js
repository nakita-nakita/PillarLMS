import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const loadPageGraphQL = ({ pageId, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!, $socketId: ID!) {
        backendSiteDesignerPage_getOneRealTimeById(id: $pageId, socketId: $socketId) {
          slug
          entity
          id
          isReady {
            order
            name
            booleanValue
            user {
              circleColor
              labelColor
              displayName
              picture
            }
          }
        }
        backendSiteDesignerPageSectionNormal_getManyByPageId(pageId: $pageId) {
          id
          name
          author
        }
        backendSiteDesignerPageSectionLoud_getOneByPageId(pageId: $pageId) {
          id
          name
          author
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
      variables: { pageId, socketId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

