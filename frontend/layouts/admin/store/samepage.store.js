import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSamePageGraphQL = ({url}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      
query($url: String!) {
    collaborateSamePage_getAllUsersFromPage(url: $url) {
      total
      users {
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
      variables: {url}
    })

    //clean up
    resolve(response?.data)
  })
}

