import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSettingOrganizationAddressGraphQL = ({ id, addressLine1, addressLine2, cityLocality, stateProvinceRegion, postalCode }) => {
  console.log('saving', { id, addressLine1, addressLine2, cityLocality, stateProvinceRegion, postalCode })
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID!, $addressLine1: String, $addressLine2: String, $cityLocality: String, $stateProvinceRegion: String, $postalCode: String) {
        backendSettingOrganization_updateOne(id: $id, addressLine1:$addressLine1, addressLine2:$addressLine2, cityLocality: $cityLocality, stateProvinceRegion: $stateProvinceRegion, postalCode: $postalCode) {
          createdAt
        }
      }
      `,
      variables: { id, addressLine1, addressLine2, cityLocality, stateProvinceRegion, postalCode }
    })

    //clean up
    resolve(response?.data)
  })
}

