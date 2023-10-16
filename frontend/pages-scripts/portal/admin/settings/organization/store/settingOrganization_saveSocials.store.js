import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSettingOrganizationSocialsGraphQL = ({ id, socialX, socialReddit, socialYouTube, socialFacebook, socialLinkedIn, socialWhatsapp, socialInstagram,socialPinterest}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation(
        $id: ID!
        $socialX: String
        $socialReddit: String
        $socialYouTube: String
        $socialFacebook: String
        $socialLinkedIn: String
        $socialWhatsapp: String
        $socialInstagram: String
        $socialPinterest: String
      ) {
        backendSettingOrganization_updateOne(
          id: $id
          socialX: $socialX,
          socialReddit: $socialReddit,
          socialYouTube: $socialYouTube,
          socialFacebook: $socialFacebook,
          socialLinkedIn: $socialLinkedIn,
          socialWhatsapp: $socialWhatsapp,
          socialInstagram: $socialInstagram
          socialPinterest: $socialPinterest,
        ) {
          createdAt
        }
      }
      
      `,
      variables: { id, socialX, socialReddit, socialYouTube, socialFacebook, socialLinkedIn, socialWhatsapp, socialInstagram,socialPinterest}
    })

    //clean up
    resolve(response?.data)
  })
}

