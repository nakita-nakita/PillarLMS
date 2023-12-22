import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    clientSiteColors_getOne: isPublic,
    clientSiteFooter_getOne: isPublic,
    clientSiteHeader_getOne: isPublic,
    clientSiteLink_getOne: isPublic,
    clientSiteBrowser_getOne: isPublic,
    clientSiteOrganization_getOne: isPublic,
    clientSitePage_getOneById: isPublic,
    clientSitePageBrowser_getOneByPageId: isPublic,
    clientSitePageLink_getOneByPageId: isPublic,
    clientSitePageSectionLoud_getOneByPageId: isPublic,
    clientSitePageSectionNormal_getManyByPageId: isPublic,
  },
}