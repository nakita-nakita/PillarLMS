import uploaderAuth from "../../../../../uploader/auth/isAuthenticated"
import { mediaManagerUpload } from "./upload.rules"
import makeBackendMediaManagerFileMain from "../main/backendMediaManagerFile.main";
import { makeDObj } from "../../../../utils/dependencies/makeDependency";


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

    // d.subDomainTransaction.commit()

    return res.status(200).json({
      success: true,
    })
  })

}