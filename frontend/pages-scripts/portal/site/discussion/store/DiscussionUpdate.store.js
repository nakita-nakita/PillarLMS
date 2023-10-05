import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussion_updateOne_GraphQL = ({ id, title, post }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!, $title: String, $post: String) {
        backendSiteDesignerDiscussion_updateOne(id: $id, title: $title, post: $post) {
          id
          title
          post
          hasBeenEdited    
        }
      }
      `,
      variables: { id, title, post }
    })

    //clean up
    resolve(response?.data)
  })
}

