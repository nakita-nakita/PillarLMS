import { Sequelize } from "sequelize-typescript";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import uploaderAuth from "../../../../../../uploader/auth/isAuthenticated";
import makeBackendSettingOrganizationMain from "../main/backendSettingOrganization.main";
import path from "path";
import fs from 'fs-extra'
import util from 'util';
import { previewLogoUpload } from "./preview-logo-upload.rules";

const makeDObj = async (): Promise<d_allDomain> => {

  const domainDb: Sequelize = await emptyTestDomainDb();
  const domainTransaction = await domainDb.transaction();
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

export default ({ app }) => {

  app.post('/backend/api/v1/logo/file/', uploaderAuth.isAuthenticated, previewLogoUpload.single('file'), async (req, res) => {
    let logo = req.body.previewLogo //undefined vs null
    if (req.body.previewLogo === "undefined") {
      logo = undefined
    }

    if (req.body.previewLogo === "null") {
      logo = null
    }

    if (req.body.shouldApplyToTopNavMenu === "undefined") {
      req.body.shouldApplyToTopNavMenu = undefined
    }

    const regex = /\/backend\/api\/v1\/logo\/preview\/file\/(\d{4})\/(\d{2})\/([a-z0-9-]+\.jpg)/;
    const match = req.body.previewLogo.match(regex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const filename = match[3];

      const currentLocation = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "logo", filename);

      const newLocation = path.join(process.cwd(), 'uploads', 'system', "logo");

      logo = `/backend/api/v1/logo/file/${filename}`

      fs.mkdirsSync(newLocation);
      // Copy the file to the new location
      try {
        const copyFile = util.promisify(fs.copyFile);

        await copyFile(currentLocation, path.join(newLocation, filename));
        // Optional: You might also want to delete the file from the old location after copying
        // fs.unlinkSync(currentLocation);

      } catch (error) {
        // console.error("Error copying file:", error);
        return res.status(500).json({
          success: false,
          message: "Error copying file."
        });
      }
    }

    const d = await makeDObj();

    const organization = makeBackendSettingOrganizationMain(d)


    await organization.upsertOne({
      id: req.body.id,
      logo,
      name: req.body.name,
      shouldApplyToTopNavMenu: req.body.shouldApplyToTopNavMenu,
    })

    d.domainTransaction.commit()
    d.subDomainTransaction.commit()

    return res.status(200).json({
      success: true,
      data: {
        picture: logo
      },
    })
  })
}