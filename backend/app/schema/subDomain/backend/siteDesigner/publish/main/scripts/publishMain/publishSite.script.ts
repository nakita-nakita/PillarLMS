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
import makeBackendSiteDesignerPublishRecordMain from "../../backendSiteDesignerPublishRecord.main";
import backendSiteDesignerPublishRecord from "../../../../../../../../models/subDomain/backend/siteDesigner/publish/backendSiteDesignerPublishRecord.model";
import { Model } from "sequelize";

export default function publishSite(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPublishRecord> | null>> => {

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
      if (browser.data) {
        await clientSiteBrowser.upsertOne(browser.data.dataValues)
      }

      const colors = await backendSettingColors.getOne()
      if (colors.data) {
        await clientSiteColors.upsertOne(colors.data.dataValues)
      }

      const footer = await backendSettingFooter.getOne()
      if (footer.data) {
        await clientSiteFooter.upsertOne(footer.data.dataValues)
      }

      const header = await backendSettingHeader.getOne()
      if (header.data) {
        await clientSiteHeader.upsertOne(header.data.dataValues)
      }

      const link = await backendSettingLink.getOne()
      if (link.data) {
        await clientSiteLink.upsertOne(link.data.dataValues)
      }

      const organization = await backendSettingOrganization.getOne()
      if (organization.data) {
        await clientSiteOrganization.upsertOne(organization.data.dataValues)
      }


      // pages
      const page = await backendSettingPage.getMany()
      if (page.data) {
        await clientSitePage.setList(page.data.map(p => p.dataValues))
      }

      const pageBrowser = await backendSiteDesignerPageBrowser.getMany()
      if (pageBrowser.data) {
        await clientSitePageBrowser.setList(pageBrowser.data.map(p => p.dataValues))
      }

      const pageLink = await backendSiteDesignerPageLink.getMany()
      if (pageLink) {
        await clientSitePageLink.setList(pageLink.data.map(p => p.dataValues))
      }

      const pageSectionLoud = await backendSiteDesignerPageSectionLoud.getMany()
      if (pageSectionLoud.data) {
        await clientSitePageSectionLoud.setList(pageSectionLoud.data.map(p => p.dataValues))
      }

      const pageSectionNormal = await backendSiteDesignerPageSectionNormal.getMany()
      if (pageSectionNormal.data) {
        await clientSitePageSectionNormal.setList(pageSectionNormal.data.map(p => p.dataValues))
      }

      //record:
      const publishRecord = makeBackendSiteDesignerPublishRecordMain(d)
      const response = await publishRecord.addOne({
        numberOfPages: page.data.length
      })

      return response

    } catch (ex) {
      return endMainFromError({
        errorIdentifier: "backendSiteDesignerPublish_publishSite_error:0000",
        hint: "Error during website publish."
      })
    }


  }
}