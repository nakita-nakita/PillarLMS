import uploaderAuth from "../../../../../../uploader/auth/isAuthenticated";
import makeBackendSettingSiteMain from "../main/backendSettingSite.main";
import path from "path";
import fs from 'fs-extra'
import util from 'util';
import { previewFaviconUpload } from "./preview-favicon-upload.rules";
import { makeDObj } from "../../../../../utils/dependencies/makeDependency";

export default ({ app }) => {

  app.post('/backend/api/v1/setting/site/file/', uploaderAuth.isAuthenticated, previewFaviconUpload.single('file'), async (req, res) => {
    let favicon = req.body.previewFavicon //undefined vs null
    if (favicon === "undefined") {
      favicon = undefined
    }

    if (favicon === "null") {
      favicon = null
    }

    if (req.body.isReady === "undefined") {
      req.body.isReady = undefined
    }

    if (req.body.id === "null" || req.body.id === "undefined") {
      req.body.id = undefined;
    }

    const regex = /\/backend\/api\/v1\/setting\/site\/preview\/file\/(\d{4})\/(\d{2})\/([a-z0-9-]+\.jpg)/;
    const match = req.body.previewFavicon.match(regex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const filename = match[3];

      const currentLocation = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "backendSettingSite", "favicon", filename);

      const newLocation = path.join(process.cwd(), 'uploads', 'system', "backendSettingSite", "favicon");

      favicon = `/backend/api/v1/setting/site/file/${filename}`

      fs.mkdirsSync(newLocation);
      // Copy the file to the new location
      try {
        const copyFile = util.promisify(fs.copyFile);

        await copyFile(currentLocation, path.join(newLocation, filename));
        // Optional: You might also want to delete the file from the old location after copying
        // fs.unsiteSync(currentLocation);

      } catch (error) {
        // console.error("Error copying file:", error);
        return res.status(500).json({
          success: false,
          message: "Error copying file."
        });
      }
    }

    const d = await makeDObj();

    const site = makeBackendSettingSiteMain(d)


    await site.upsertOne({
      id: req.body.id,
      favicon,
      tab: req.body.tab,
      isReady: req.body.isReady,
    })

    return res.status(200).json({
      success: true,
      data: {
        picture: favicon
      },
    })
  })
}