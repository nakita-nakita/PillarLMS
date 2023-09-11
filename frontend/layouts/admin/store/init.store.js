import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getAdminLayoutInitGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendUserBasicView_me {
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
      `,
    })

    //clean up
    resolve(response?.data)
  })
}

