import { Sequelize } from "sequelize-typescript";
import uploaderAuth from "../../../../../uploader/auth/isAuthenticated"
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import { previewProfileUpload } from "./preview-profile-upload.rules";

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
    errorHandler: sequelizeErrorHandler
  }
}

export default ({ app }) => {

  app.post('/backend/api/v1/profile/preview/file', uploaderAuth.isAuthenticated, previewProfileUpload.single("file"), async (req, res) => {
    const link = `/backend/api/v1/profile/preview/file/${req.user.id}/${req.file.filename}`

    res.status(200).json({
      success: true,
      data: {
        link,
      }
    })
  })

}