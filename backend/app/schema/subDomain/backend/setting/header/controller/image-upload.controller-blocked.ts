// import uploaderAuth from "../../../../../../uploader/auth/isAuthenticated";
// import makeBackendSettingLinkMain from "../main/backendSettingHeader.main";
// import path from "path";
// import fs from 'fs-extra'
// import util from 'util';
// import { previewImageUpload } from "./preview-image-upload.rules";
// import { makeDObj } from "../../../../../utils/dependencies/makeDependency";


// export default ({ app }) => {

//   app.post('/backend/api/v1/setting/link/file/', uploaderAuth.isAuthenticated, previewImageUpload.single('file'), async (req, res) => {
//     let image = req.body.previewImage //undefined vs null
//     if (image === "undefined") {
//       image = undefined
//     }

//     if (image === "null") {
//       image = null
//     }

//     if (req.body.isReady === "undefined") {
//       req.body.isReady = undefined
//     }

//     if (req.body.id === "null" || req.body.id === "undefined") {
//       req.body.id = undefined;
//     }

//     const regex = /\/backend\/api\/v1\/setting\/link\/preview\/file\/(\d{4})\/(\d{2})\/([a-z0-9-]+\.jpg)/;
//     const match = req.body.previewImage.match(regex);

//     if (match) {
//       const year = match[1];
//       const month = match[2];
//       const filename = match[3];

//       const currentLocation = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "backendSettingLink", "image", filename);

//       const newLocation = path.join(process.cwd(), 'uploads', 'system', "backendSettingLink", "image");

//       image = `/backend/api/v1/setting/link/file/${filename}`

//       fs.mkdirsSync(newLocation);
//       // Copy the file to the new location
//       try {
//         const copyFile = util.promisify(fs.copyFile);

//         await copyFile(currentLocation, path.join(newLocation, filename));
//         // Optional: You might also want to delete the file from the old location after copying
//         // fs.unlinkSync(currentLocation);

//       } catch (error) {
//         // console.error("Error copying file:", error);
//         return res.status(500).json({
//           success: false,
//           message: "Error copying file."
//         });
//       }
//     }

//     const d = await makeDObj();

//     const link = makeBackendSettingLinkMain(d)


//     await link.upsertOne({
//       id: req.body.id,
//       image,
//       description: req.body.description,
//       title: req.body.title,
//       isReady: req.body.isReady,
//     })


//     return res.status(200).json({
//       success: true,
//       data: {
//         picture: image
//       },
//     })
//   })
// }