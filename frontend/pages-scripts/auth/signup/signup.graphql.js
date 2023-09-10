import { callApi } from "@/utils/graphql/backend-api"

export const signUpGraphQL = ({ email, password, confirmPassword }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($email: String!, $password: String!, $confirmPassword: String!) {
        foundationAuth_signup(email: $email, password: $password, confirmPassword: $confirmPassword) {
          token
        }
      }
      `,
      variables: { email, password, confirmPassword }
    })

    //clean up
    resolve(response?.data)
  })
}