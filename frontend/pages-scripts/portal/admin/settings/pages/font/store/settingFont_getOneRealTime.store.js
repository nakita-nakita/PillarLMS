import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingFontGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: ID!) {
        backendSettingFont_getOneRealTime(socketId: $socketId) {
          id
          entity
          tab {
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
          favicon {
            order
            name
            selection
            currentSelection {
              id
              favicon
              user {
                displayName
                labelColor
                circleColor
                picture
              }
            }
            uploads {
              id
              favicon
              user {
                displayName
                labelColor
                circleColor
                picture
              }
            }
          }
          isReady {
            order
            name
            booleanValue
            user {
              id
              displayName
              circleColor
              labelColor
              picture
            }
          }
        }
      }
      
      
      `,
      variables: { socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

