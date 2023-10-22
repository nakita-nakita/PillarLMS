import { Sequelize } from "sequelize-typescript";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import uploaderAuth from "../../../../../../uploader/auth/isAuthenticated";
import makeCollaborateSameDocPictureSelection from "../../../../collaborate/sameDoc/preMain/collaborateSameDocPictureSelection.ram-cache";
import { previewImageUpload } from "./preview-image-upload.rules";

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

  app.post('/backend/api/v1/setting/link/preview/file/', uploaderAuth.isAuthenticated, previewImageUpload.single("file"), async (req, res) => {
    let picture
    const data: any = {}

    if (req.file?.filename) {
      
      const currentDate = new Date();
      const year = currentDate.getFullYear(); // will get you a four-digit year
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // will get you a two-digit month
      
      picture = `/backend/api/v1/setting/link/preview/file/${year}/${month}/${req.file.filename}`
      data.picture = `/backend/api/v1/setting/link/preview/file/${year}/${month}/${req.file.filename}`
    
      const d = await makeDObj();

      const pictureSelection = makeCollaborateSameDocPictureSelection(d)
  
      await pictureSelection.uploadPicture({
        entity: "backendSettingLink",
        name: req.body.name,
        picture,
        socketId: req.body.socketId,
      })
  
  
      return res.status(200).json({
        success: true,
        data,
      })
    }

    return res.status(500).json({
      success: false,
      data:{
        message: "You forgot the file."
      }
    })

    // if (!req.file?.filename && req.body.selection === "NO_IMAGE") {
    //  picture = null; 
    // }

    // if (!req.file?.filename && req.body.selection === "CURRENT_IMAGE") {
    //   picture = undefined
    // }


  })
}