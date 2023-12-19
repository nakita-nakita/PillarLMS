import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const createLoudSectionGraphQL = ({ pageId, selectionType, selectionId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation(
        $pageId: ID!
        $selectionType: SelectionTypeEnum!
        $selectionId: ID!
      ) {
        backendSiteDesignerPageSectionLoud_upsertOne(
          pageId: $pageId
          selectionType: $selectionType
          selectionId: $selectionId
        ) {
          id
        }
      }
      
      `,
      variables: { pageId, selectionType, selectionId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}



