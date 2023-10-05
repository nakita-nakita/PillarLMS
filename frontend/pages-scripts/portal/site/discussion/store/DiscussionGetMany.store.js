import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSiteDesignerDiscussion_getMany_GraphQL = ({ type, pageSize, page }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($type: discussionOrderEnum!, $pageSize: Int, $page: Int) {
        backendSiteDesignerDiscussion_getManyWithPagination(type: $type, pageSize: $pageSize, page: $page) {
          count
          rows{
            id
            title
            post
            hasBeenEdited
            createdAt
            voteTotal
            commentsCount
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
      variables: { type, pageSize, page }
    })

    //clean up
    resolve(response?.data)
  })
}

