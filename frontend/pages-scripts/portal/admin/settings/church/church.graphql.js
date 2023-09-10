import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingsChurchGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSetting_church_getOne {
          logo
          streetAddress
          suiteNumber
          zipCode
          city
          state
          socialTwitter
          socialFacebook
          socialInstagram
          socialWhatsapp
          socialTelegram
        }
      }
      
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


export const postSettingsChurchGraphQL = ({ suiteNumber, zipCode, state, socialTwitter, socialFacebook, socialInstagram, socialWhatsapp, socialTelegram, city }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($logo: String,$streetAddress: String, $suiteNumber: String, $zipCode: String, $city: String, $state: String, $socialTwitter: String, $socialFacebook: String, $socialInstagram: String, $socialWhatsapp: String, $socialTelegram: String) {
        backendSetting_church_updateOne(logo: $logo, streetAddress: $streetAddress, suiteNumber: $suiteNumber, zipCode: $zipCode, city: $city, state: $state, socialTwitter: $socialTwitter, socialFacebook: $socialFacebook, socialInstagram: $socialInstagram, socialWhatsapp: $socialWhatsapp, socialTelegram: $socialTelegram) {
          logo
          streetAddress
          suiteNumber
          zipCode
          city
          state
          socialTwitter
          socialFacebook
          socialInstagram
          socialWhatsapp
          socialTelegram
        }
      }
      `,
      variables: { suiteNumber, zipCode, state, socialTwitter, socialFacebook, socialInstagram, socialWhatsapp, socialTelegram, city }
    })

    //clean up
    resolve(response?.data)
  })
}