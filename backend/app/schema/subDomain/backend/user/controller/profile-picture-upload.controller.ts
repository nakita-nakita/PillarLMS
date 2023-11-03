import uploaderAuth from "../../../../../uploader/auth/isAuthenticated"
import { profileUpload } from "./profile-upload.rules";
import makeWhoIsOnPage from "../../../collaborate/_singleton/preMain/whoIsOnPage.ram-cache";
import makeFoundationUserProfileMain from "../../../../domain/foundation/user/main/foundationUserProfile.main";
import { makeDObj } from "../../../../utils/dependencies/makeDependency";


export default ({ app }) => {

  app.post('/backend/api/v1/profile/file', uploaderAuth.isAuthenticated, profileUpload.single("file"), async (req, res) => {
    let picture
    if (req.file?.filename) {
      picture = `/backend/api/v1/profile/file/${req.user.id}/${req.file.filename}`
    }

    const d = await makeDObj();

    const profile = makeFoundationUserProfileMain(d)
    const whoIsOnPage = makeWhoIsOnPage(d)

    await profile.upsertOne({
      id: req.user.id,
      callByType: req.body.callByType || undefined,
      circleColor: req.body.circleColor,
      firstName: req.body.firstName || undefined,
      labelColor: req.body.labelColor,
      lastName: req.body.lastName || undefined,
      username: req.body.username || undefined,
      picture: req.body.pictureAction === "remove" ? null : picture,
    })

    
    //change displays for all user sockets.
    await whoIsOnPage.changeDisplayForUser({
      id: req.user.id,
    })
    
    d.subDomainTransaction.commit()
    d.domainTransaction.commit()

    let data: any = {}

    if (req.body.pictureAction === "remove") {
      data.link = null
    }

    if (picture) {
      data.link = picture
    }

    return res.status(200).json({
      success: true,
      data,
    })
  })

}