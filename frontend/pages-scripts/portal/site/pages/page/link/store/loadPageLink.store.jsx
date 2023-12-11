import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const loadPageLinkGraphQL = ({ pageId, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($pageId: ID!, $socketId: ID!) {
        backendSiteDesignerPageLink_getOneRealTimeByPageId(
          pageId: $pageId
          socketId: $socketId
        ) {
          entity
          id
          title {
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
          description {
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
          picture {
            order
            name
            selection
            currentSelection {
              id
              media
              user {
                id
                circleColor
                labelColor
                displayName
                picture
              }
            }
            uploads {
              id
              media
              user {
                id
                displayName
                labelColor
                circleColor
                picture
              }
            }
          }
        }
      }
                 
      `,
      variables: { pageId, socketId, }
    })

    //clean up
    resolve(response?.data)
  })
}

