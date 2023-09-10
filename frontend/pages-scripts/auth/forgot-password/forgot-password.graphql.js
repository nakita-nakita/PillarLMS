import { callApi } from "@/utils/graphql/backend-api"

export const forgotPasswordGraphQL = ({ email }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($email: String!) {
        foundationAuth_forgotPassword(email: $email) {
          success
        }
      }
      `,
      variables: { email }
    })

    //clean up
    resolve(response?.data)
  })
}