import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const selectSettingHeaderGraphQL = ({ id, type, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!, $type: SelectionTypeEnum!, $socketId: ID!) {
        backendSettingHeader_selectHeader(id: $id, type: $type, socketId: $socketId) {
          id
          entity
          webAssetImport
          menuJsonB
          userAnswersJsonB
          selectionType
          selectionId
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
      }
      
      
      `,
      variables: { id, type, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

