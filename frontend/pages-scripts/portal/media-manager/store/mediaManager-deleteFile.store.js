import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postMediaManagerDeleteFileGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!) {
        backendMediaManagerFile_deleteOne(id: $id) {
          success
        }
      }
      `,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}

