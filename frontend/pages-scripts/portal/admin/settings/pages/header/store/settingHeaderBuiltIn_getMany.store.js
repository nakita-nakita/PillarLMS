import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingHeaderBuiltInGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSettingHeaderBuiltIn_getMany{
          id
          webAssetImport
          menuJsonB
          description
          author
          authorLink
          name
          category
          theme
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}

