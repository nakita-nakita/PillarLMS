import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingFooterRealTimeGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: ID!) {
        backendSettingFooter_getOneRealTime(socketId: $socketId) {
          entity
          webAssetImport
          menuJsonB
          userAnswersJsonB
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

