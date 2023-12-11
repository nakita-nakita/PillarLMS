import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const savePageLinkGraphQL = ({ pageId, id, title, description, picture, pictureAlt, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation(
        $pageId: ID!
        $id: ID
        $title: String
        $description: String
        $picture: String
        $pictureAlt: String
      ) {
        backendSiteDesignerPageLink_upsertOne(
          pageId: $pageId
          id: $id
          title: $title
          description: $description
          picture: $picture
          pictureAlt: $pictureAlt
        ) {
          success
        }
      }
      `,
      variables: { pageId, id, title, description, picture, pictureAlt, }
    })

    //clean up
    resolve(response?.data)
  })
}

