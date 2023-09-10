import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingsSiteGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSetting_site_getOne {
          churchShortName
          favicon
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}

export const postSettingsSiteGraphQL = ({ churchShortName, favicon }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($churchShortName: String, $favicon: String) {
        backendSetting_site_updateOne(churchShortName: $churchShortName, favicon: $favicon) {
          churchShortName
          favicon
        }
      }
      `,
      variables: { churchShortName, favicon }
    })

    //clean up
    resolve(response?.data)
  })
}