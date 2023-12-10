import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const savePageBrowserGraphQL = ({ id, pageId, tabName, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($pageId: ID!, $id: ID, $tabName: String) {
        backendSiteDesignerPageBrowser_upsertOne(id:$id, pageId: $pageId, tabName: $tabName) {
          success
        }
      }
      `,
      variables: { id, pageId, tabName, }
    })

    //clean up
    resolve(response?.data)
  })
}

