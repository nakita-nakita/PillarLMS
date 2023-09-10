//http://.../uploader/user-avatar-previewer

import multer from 'multer';
import fs from 'fs-extra'
import path from "path"
import uploaderAuth from './auth/isAuthenticated';
import { v4 as uuidv4 } from "uuid"

const uploadControllers = async ({ app }) => {

  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        let location = "./uploads/temp/no-location-provided"
        let folder = ""

        //url params gives us type and that simply changes folder location
        if (req.params?.type) {
          switch (req.params?.type) {

            case "user-avatar-previewer":
              folder = "temp/user-avatars"
              break;

            case "user-avatar":
              folder = "user-avatars"
              break;

            case "logo-previewer":
              folder = "temp/logo"
              break;

            case "logo":
              folder = "logo"
              break;

          }
          // let type = req.params.type;
          location = `./uploads/${folder}`; // 'temp/user-avatars'
          //make sure the folders exist.
          fs.mkdirsSync(location);
        }


        callback(null, location);
      },
      filename: (req, file, callback) => {
        //originalname is the uploaded file's name with extn
        callback(null, `${uuidv4()}-${file.originalname}`);
      }
    })
  })

  app.post('/api/v1/uploader/:type', uploaderAuth.isAuthenticated, upload.single("files"), (req, res) => {

    let link = "";

    switch (req.params?.type) {
      case "user-avatar":
        link = `/api/v1/uploader/user-avatar/${req.file.filename}`
        break;
      case "user-avatar-previewer":
        link = `/api/v1/uploader/user-avatar-previewer/${req.file.filename}`
        break;
        case "logo":
          link = `/api/v1/uploader/logo/${req.file.filename}`
          break;
        case "logo-previewer":
          link = `/api/v1/uploader/logo-previewer/${req.file.filename}`
          break;
      ///////////////////////////////////////////////////////////////here
    }

    res.status(200).json({
      success: true,
      data: {
        link,
      }
    })
  })

  app.get('/api/v1/uploader/user-avatar-previewer/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'temp', 'user-avatars', req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

  app.get('/api/v1/uploader/user-avatar/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'user-avatars', req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })
  
  app.get('/api/v1/uploader/logo-previewer/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'temp', 'logo', req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

  app.get('/api/v1/uploader/logo/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'logo', req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })
}

export default uploadControllers;
