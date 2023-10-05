import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSiteDesignerDiscussionComment_getMany_GraphQL = ({ discussionId, page, pageSize }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($discussionId: ID!, $page: Int, $pageSize: Int) {
        backendSiteDesignerDiscussionComment_getManyWithPagination(discussionId: $discussionId, page: $page, pageSize: $pageSize) {
          count
          page
          pageCount
          pageSize
          rows {
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
      }
      `,
      variables: { discussionId, page, pageSize }
    })

    //clean up
    resolve(response?.data)
  })
}

