import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSiteDesignerDiscussion_getOneById_GraphQL = ({ id, page, pageSize}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!, $page: Int, $pageSize: Int) {
        backendSiteDesignerDiscussion_getOneById(id: $id) {
          id
          title
          post
          hasBeenEdited
          createdAt
          updatedAt
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
        backendSiteDesignerDiscussionComment_getManyWithPagination(discussionId: $id, page: $page, pageSize: $pageSize) {
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
      variables: { id, page, pageSize }
    })

    //clean up
    resolve(response?.data)
  })
}

