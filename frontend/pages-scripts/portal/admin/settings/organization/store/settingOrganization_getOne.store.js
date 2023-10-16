import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingOrganizationGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: String!) {
        backendSettingOrganization_getOne(socketId: $socketId) {
          entity
          logo
          name {
            order
            name
            textValue
            selections {
              order
              userId
              username
              userColor
              range{
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
              range{
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
              range{
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
              range{
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
              range{
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
              range{
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

