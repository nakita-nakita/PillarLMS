import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const loadPageBrowserGraphQL = ({ pageId, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
query($pageId: ID!, $socketId: ID!) {
  backendSiteDesignerPage_getOneById(id: $pageId) {
    slug
  }
  backendSiteDesignerPageBrowser_getOneRealTimeByPageId(
    pageId: $pageId
    socketId: $socketId
  ) {
    entity
    tabName {
      order
      name
      textValue
      selections {
        order
        userId
        username
        userColor
        range {
          index
          length
        }
      }
    }
  }
  backendSettingSite_getOne {
    favicon
    tab
  }
}
           
      `,
      variables: { pageId, socketId, }
    })

    //clean up
    resolve(response?.data)
  })
}

