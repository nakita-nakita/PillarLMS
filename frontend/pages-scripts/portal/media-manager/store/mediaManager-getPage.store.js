import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getMediaManagerPageGraphQL = ({ folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($folderId: ID) {
        backendMediaManagerFile_getMany(folderId: $folderId) {
          id
          userFileName
        }
        backendMediaManagerFolder_getMany(folderId: $folderId) {
          id
          name
        }
      }
      `,
      variables: { folderId }
    })

    //clean up
    resolve(response?.data)
  })
}

