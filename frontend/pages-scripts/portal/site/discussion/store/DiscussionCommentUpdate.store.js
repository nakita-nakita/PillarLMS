import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussionComment_updateOne_GraphQL = ({ id, post, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!, $post: String) {
        backendSiteDesignerDiscussionComment_updateOne(id: $id, post: $post) {
          id
        }
      }
      `,
      variables: { id, post, }
    })

    //clean up
    resolve(response?.data)
  })
}

