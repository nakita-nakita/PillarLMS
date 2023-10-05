import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussionComment_addOne_GraphQL = ({ discussionId, post }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($discussionId: ID!, $post: String!) {
        backendSiteDesignerDiscussionComment_addOne(discussionId: $discussionId, post: $post) {
          id
          post
          hasBeenEdited
          createdAt
          updatedAt
          voteTotal
          myVote
          user {
            id
            email
            firstName
            lastName
            username
            picture
            callByType
            circleColor
            labelColor
          }
        }
      }
      `,
      variables: { discussionId, post }
    })

    //clean up
    resolve(response?.data)
  })
}

