import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingLinkGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: String!) {
        backendSettingLink_getOneRealTime(socketId: $socketId) {
          id
          entity
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
          image {
            order,
            name
            selection
            currentSelection {
              picture
              user {
                id
                picture
                circleColor
                labelColor
                displayName
              }
            }
            uploads {
              picture
              user {
                displayName
                labelColor
                circleColor
                id
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
              picture
              displayName
              circleColor
              labelColor
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

