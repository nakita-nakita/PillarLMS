import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingOrganizationGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: String!) {
        backendSettingOrganization_getOneRealTime(socketId: $socketId) {
          id
          entity
          logo {
            order
            name
            selection
            currentSelection {
              picture
            }
            uploads {
              id
              picture
              user {
                id
                circleColor
                labelColor
                displayName
                picture
              }
            }
          }
          shouldApplyToTopNavMenu {
            order
            name
            booleanValue
            user {
              id
              circleColor
              labelColor
              displayName
              picture
            }
          }
          name {
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
          addressLine1 {
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
          addressLine2 {
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
          cityLocality {
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
          stateProvinceRegion {
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
          postalCode {
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
          socialX {
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
          socialReddit {
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
          socialYouTube {
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
          socialFacebook {
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
          socialLinkedIn {
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
          socialWhatsapp {
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
          socialInstagram {
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
          socialPinterest {
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
      }
      
      `,
      variables: { socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

