import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussion_addOne_GraphQL = ({ title, post, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($title: String!, $post: String!) {
        backendSiteDesignerDiscussion_addOne(title: $title, post: $post) {
          id
        }
      }
      `,
      variables: { title, post, }
    })

    //clean up
    resolve(response?.data)
  })
}

