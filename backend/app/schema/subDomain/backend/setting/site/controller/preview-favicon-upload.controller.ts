import uploaderAuth from "../../../../../../uploader/auth/isAuthenticated";
import makeCollaborateSameDocPictureSelection from "../../../../collaborate/sameDoc/preMain/collaborateSameDocPictureSelection.ram-cache";
import { previewFaviconUpload } from "./preview-favicon-upload.rules";
import makeCollaborateSameDocFaviconSelection from "../../../../collaborate/sameDoc/preMain/collaborateSameDocFaviconSelection.ram-cache";
import { makeDObj } from "../../../../../utils/dependencies/makeDependency";


export default ({ app }) => {

  app.post('/backend/api/v1/setting/site/preview/file/', uploaderAuth.isAuthenticated, previewFaviconUpload.single("file"), async (req, res) => {
    let favicon
    const data: any = {}

    if (req.file?.filename) {
      
      const currentDate = new Date();
      const year = currentDate.getFullYear(); // will get you a four-digit year
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // will get you a two-digit month
      
      favicon = `/backend/api/v1/setting/site/preview/file/${year}/${month}/${req.file.filename}`
      data.favicon = `/backend/api/v1/setting/site/preview/file/${year}/${month}/${req.file.filename}`
    
      const d = await makeDObj();


      // we are using the favicon adapter now.
      const faviconSelection = makeCollaborateSameDocFaviconSelection(d)
  
      await faviconSelection.uploadFavicon({
        entity: "backendSettingSite",
        name: req.body.name,
        favicon,
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

  })
}