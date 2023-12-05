import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getMediaManagerModelGraphQL = ({ folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: folderId
        ? `
      query($folderId: ID!) {
        backendMediaManagerFile_getMany(folderId: $folderId) {
          id
          userFileName
          url
        }
        backendMediaManagerFolder_getMany(folderId: $folderId) {
          id
          name
        }
        backendMediaManagerFolder_getBreadCrumb(folderId: $folderId) {
          id
          name
          order
        }
      }
      `
        : `
      query($folderId: ID) {
        backendMediaManagerFile_getMany(folderId: $folderId) {
          id
          userFileName
          url
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

