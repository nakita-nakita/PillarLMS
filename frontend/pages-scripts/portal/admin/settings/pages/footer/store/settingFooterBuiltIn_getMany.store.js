import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingFooterBuiltInGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSettingFooterBuiltIn_getMany{
          id
          webAssetImport
          menuJsonB
          description
          author
          authorLink
          name
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}

