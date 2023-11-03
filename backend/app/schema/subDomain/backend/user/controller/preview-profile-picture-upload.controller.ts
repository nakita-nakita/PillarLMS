import uploaderAuth from "../../../../../uploader/auth/isAuthenticated"
import { previewProfileUpload } from "./preview-profile-upload.rules";

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