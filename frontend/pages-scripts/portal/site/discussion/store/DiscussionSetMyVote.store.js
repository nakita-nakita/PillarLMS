import { callSubDomainApi } from "@/utils/graphql/backend-api"

// VOTE = "UP" || "DOWN" || NONE
export const postSiteDesignerDiscussion_SetMyVote_GraphQL = ({ discussionId, vote }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($discussionId: ID!, $vote: siteDesignerDiscussionVoteEnum!) {
        backendSiteDesignerDiscussionVote_setMyVote(discussionId: $discussionId, vote: $vote) {
          success
        }
      }
      `,
      variables: { discussionId, vote }
    })

    //clean up
    resolve(response?.data)
  })
}

