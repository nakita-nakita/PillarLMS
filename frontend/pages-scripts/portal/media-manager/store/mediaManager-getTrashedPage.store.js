import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getMediaManagerTrashedPageGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendMediaManagerFile_viewTrash {
          id
          userFileName
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}

