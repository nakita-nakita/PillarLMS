import { callSubDomainApi } from "@/utils/graphql/backend-api"

// VOTE = "UP" || "DOWN" || NONE
export const postSiteDesignerDiscussionComment_setMyVote_GraphQL = ({ commentId, vote }) => {
  console.log('commentId', commentId)
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($commentId: ID!, $vote: siteDesignerDiscussionVoteEnum!) {
        backendSiteDesignerDiscussionCommentVote_setMyVote(commentId: $commentId, vote: $vote) {
          success
        }
      }
      `,
      variables: { commentId, vote }
    })

    //clean up
    resolve(response?.data)
  })
}

