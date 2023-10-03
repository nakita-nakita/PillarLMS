import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postMediaManagerRenameFolderGraphQL = ({ id, name }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!, $name: String!) {
        backendMediaManagerFolder_rename(id: $id, name: $name) {
          id
          name
        }
      }
      `,
      variables: { id, name }
    })

    //clean up
    resolve(response?.data)
  })
}

