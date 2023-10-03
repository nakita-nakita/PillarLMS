import { Sequelize } from "sequelize-typescript";
import uploaderAuth from "../../../../../uploader/auth/isAuthenticated"
import { mediaManagerUpload } from "./upload.rules"
import { d_sub } from "../../../../utils/types/dependencyInjection.types";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeBackendMediaManagerFileMain from "../main/backendMediaManagerFile.main";

const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

export default ({ app }) => {

  app.post('/api/v1/media-manager/file', uploaderAuth.isAuthenticated, mediaManagerUpload.single("files"), async (req, res) => {
    const url = `/api/v1/media-manager/file/${req.file.filename}`
    const systemFileName = req.file.filename
    const userFileName = req.file.originalname
    const folderId = req.body.folderId

    const d = await makeDObj();

    const fileSql = makeBackendMediaManagerFileMain(d)

    await fileSql.addOne({
      systemFileName,
      uploadedBy: req.user.id,
      url,
      userFileName,
      folderId,
    })

    d.subDomainTransaction.commit()

    return res.status(200).json({
      success: true,
    })
  })

}