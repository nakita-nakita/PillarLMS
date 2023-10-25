import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingColorsGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: ID!) {
        backendSettingColors_getOneRealTime(socketId: $socketId) {
          id
          entity
          color1 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color2 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color3 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color4 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color5 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color6 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
          color7 {
            order
            name
            color
            colorLight1
            colorLight2
            colorLight3
            colorLight4
            colorDark1
            colorDark2
            colorDark3
            colorDark4
            user {
              id
              circleColor
              labelColor
              picture
              displayName
            }
          }
      
          isReady {
            order
            name
            booleanValue
      
            user {
              id
              circleColor
              labelColor
              picture
              displayName
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

