import { callApi } from "@/utils/graphql/backend-api"

export const signInGraphQL = ({ email, password }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($email: String!, $password: String!) {
        foundationAuth_signin(email: $email, password: $password) {
          token
        }
      }
      `,
      variables: { email, password }
    })

    //clean up
    resolve(response?.data)
  })
}