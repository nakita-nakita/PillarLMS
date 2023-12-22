import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeClientSiteColorsMain from "../../../../../../client/site/main/clientSiteColors.main";
import makeClientSiteBrowserMain from "../../../../../../client/site/main/clientSiteBrowser.main";
import makeClientSiteFooterMain from "../../../../../../client/site/main/clientSiteFooter.main";
import makeClientSiteHeaderMain from "../../../../../../client/site/main/clientSiteHeader.main";
import makeClientSiteLinkMain from "../../../../../../client/site/main/clientSiteLink.main";
import makeClientSiteOrganizationMain from "../../../../../../client/site/main/clientSiteOrganization.main";
import makeClientSitePageMain from "../../../../../../client/site/main/clientSitePage.main";
import makeClientSitePageBrowserMain from "../../../../../../client/site/main/clientSitePageBrowser.main";
import makeClientSitePageLinkMain from "../../../../../../client/site/main/clientSitePageLink.main";
import makeClientSitePageSectionLoudMain from "../../../../../../client/site/main/clientSitePageSectionLoud.main";
import makeClientSitePageSectionNormalMain from "../../../../../../client/site/main/clientSitePageSectionNormal.main";
import makeBackendSettingSiteMain from "../../../../../setting/site/main/backendSettingSite.main";
import makeBackendSettingColorsMain from "../../../../../setting/colors/main/backendSettingColors.main";
import makeBackendSettingFooterMain from "../../../../../setting/footer/main/backendSettingFooter.main";
import makeBackendSettingHeaderMain from "../../../../../setting/header/main/backendSettingHeader.main";
import makeBackendSettingLinkMain from "../../../../../setting/links/main/backendSettingLink.main";
import makeBackendSettingOrganizationMain from "../../../../../setting/organization/main/backendSettingOrganization.main";
import makeBackendSiteDesignerPageMain from "../../../../page/main/backendSiteDesignerPage.main";
import makeBackendSiteDesignerPageBrowserMain from "../../../../page/main/backendSiteDesignerPageBrowser.main";
import makeBackendSiteDesignerPageLinkMain from "../../../../page/main/backendSiteDesignerPageLink.main";
import makeBackendSiteDesignerPageSectionLoudMain from "../../../../page/main/backendSiteDesignerPageSectionLoud.main";
import makeBackendSiteDesignerPageSectionNormalMain from "../../../../page/main/backendSiteDesignerPageSectionNormal.main";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";

export default function publishSite(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
      const clientSiteBrowser = makeClientSiteBrowserMain(d)
      const backendSettingBrowser = makeBackendSettingSiteMain(d)

      const clientSiteColors = makeClientSiteColorsMain(d)
      const backendSettingColors = makeBackendSettingColorsMain(d)

      const clientSiteFooter = makeClientSiteFooterMain(d)
      const backendSettingFooter = makeBackendSettingFooterMain(d)

      const clientSiteHeader = makeClientSiteHeaderMain(d)
      const backendSettingHeader = makeBackendSettingHeaderMain(d)

      const clientSiteLink = makeClientSiteLinkMain(d)
      const backendSettingLink = makeBackendSettingLinkMain(d)

      const clientSiteOrganization = makeClientSiteOrganizationMain(d)
      const backendSettingOrganization = makeBackendSettingOrganizationMain(d)

      const clientSitePage = makeClientSitePageMain(d)
      const backendSettingPage = makeBackendSiteDesignerPageMain(d)

      const clientSitePageBrowser = makeClientSitePageBrowserMain(d)
      const backendSiteDesignerPageBrowser = makeBackendSiteDesignerPageBrowserMain(d)

      const clientSitePageLink = makeClientSitePageLinkMain(d)
      const backendSiteDesignerPageLink = makeBackendSiteDesignerPageLinkMain(d)

      const clientSitePageSectionLoud = makeClientSitePageSectionLoudMain(d)
      const backendSiteDesignerPageSectionLoud = makeBackendSiteDesignerPageSectionLoudMain(d)

      const clientSitePageSectionNormal = makeClientSitePageSectionNormalMain(d)
      const backendSiteDesignerPageSectionNormal = makeBackendSiteDesignerPageSectionNormalMain(d)

      // website
      const browser = await backendSettingBrowser.getOne()
      await clientSiteBrowser.upsertOne(browser.data.dataValues)

      const colors = await backendSettingColors.getOne()
      await clientSiteColors.upsertOne(colors.data.dataValues)

      const footer = await backendSettingFooter.getOne()
      await clientSiteFooter.upsertOne(footer.data.dataValues)

      const header = await backendSettingHeader.getOne()
      await clientSiteHeader.upsertOne(header.data.dataValues)

      const link = await backendSettingLink.getOne()
      await clientSiteLink.upsertOne(link.data.dataValues)

      const organization = await backendSettingOrganization.getOne()
      await clientSiteOrganization.upsertOne(organization.data.dataValues)


      // pages
      const page = await backendSettingPage.getMany()
      await clientSitePage.setList(page.data.map(p => p.dataValues))

      const pageBrowser = await backendSiteDesignerPageBrowser.getMany()
      await clientSitePageBrowser.setList(pageBrowser.data.map(p => p.dataValues))

      const pageLink = await backendSiteDesignerPageLink.getMany()
      await clientSitePageLink.setList(pageLink.data.map(p => p.dataValues))

      const pageSectionLoud = await backendSiteDesignerPageSectionLoud.getMany()
      await clientSitePageSectionLoud.setList(pageSectionLoud.data.map(p => p.dataValues))

      const pageSectionNormal = await backendSiteDesignerPageSectionNormal.getMany()
      await clientSitePageSectionNormal.setList(pageSectionNormal.data.map(p => p.dataValues))

    } catch (ex) {
      return endMainFromError({
        errorIdentifier: "backendSiteDesignerPublish_publishSite_error:0000",
        hint: "Error during website publish."
      })
    }


    return null
  }
}