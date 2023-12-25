import { callSubDomainApiMiddlewareWithToken } from "@/utils/graphql/backend-api.middleware"

export const getClientPageIdBySlugGraphQL = ({ slug }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApiMiddlewareWithToken({
      query: `
      query($slug: String!) {
        clientSitePage_getOneBySlug(slug: $slug) {
          id
          slug
        }
      }            
      `,
      variables: { slug }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}

