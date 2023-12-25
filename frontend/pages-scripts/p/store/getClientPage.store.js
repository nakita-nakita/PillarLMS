import { callSubDomainApiMiddlewareWithToken } from "@/utils/graphql/backend-api.middleware"

export const getClientPageGraphQL = ({ pageId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApiMiddlewareWithToken({
      query: `
      query($pageId: ID!) {
        clientSiteFooter_getOne {
          webAssetImport
          userAnswersJsonB
        }
        clientSiteHeader_getOne {
          webAssetImport
          userAnswersJsonB
        }
        clientSiteLink_getOne {
          title
          description
          image
        }
        clientSiteBrowser_getOne {
          favicon
          tab
        }
        clientSiteOrganization_getOne {
          logo
          name
          addressLine1
          addressLine2
          cityLocality
          stateProvinceRegion
          postalCode
          socialFacebook
          socialX
          socialInstagram
          socialLinkedIn
          socialYouTube
          socialPinterest
          socialWhatsapp
          socialReddit
        }
        clientSitePageBrowser_getOneByPageId(pageId: $pageId) {
          tabName
        }
        clientSitePageLink_getOneByPageId(pageId: $pageId) {
          title
          description
          picture
          pictureAlt
        }
        clientSitePageSectionLoud_getOneByPageId(pageId: $pageId) {
          webAssetImport
          userAnswersJsonB
        }
        clientSitePageSectionNormal_getManyByPageId(pageId: $pageId) {
          webAssetImport
          userAnswersJsonB
        }
      }
      
      `,
      variables: { pageId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

