import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingsLinksGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSetting_links_getOne {
          donationLink
          virtualServicesLink
          defaultMetaPicture
          defaultMetaTitle
          defaultMetaDescription
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}

 
export const postSettingsLinksGraphQL = ({ donationLink ,virtualServicesLink ,defaultMetaPicture ,defaultMetaTitle ,defaultMetaDescription }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($donationLink: String, $virtualServicesLink: String, $defaultMetaTitle: String, $defaultMetaPicture: String, $defaultMetaDescription: String) {
        backendSetting_links_updateOne(donationLink: $donationLink, virtualServicesLink: $virtualServicesLink, defaultMetaTitle: $defaultMetaTitle, defaultMetaPicture: $defaultMetaPicture, defaultMetaDescription: $defaultMetaDescription){
          donationLink
          virtualServicesLink
          defaultMetaPicture
          defaultMetaTitle
          defaultMetaDescription 
        }
      }
      `,
      variables: { donationLink ,virtualServicesLink ,defaultMetaPicture ,defaultMetaTitle ,defaultMetaDescription }
    })

    //clean up
    resolve(response?.data)
  })
}