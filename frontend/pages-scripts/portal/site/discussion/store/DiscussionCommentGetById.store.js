import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSiteDesignerDiscussionComment_getOneById_GraphQL = ({ id, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($id: ID!) {
        backendSiteDesignerDiscussionComment_getOneById(id: $id) {
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
      variables: { id, }
    })

    //clean up
    resolve(response?.data)
  })
}

