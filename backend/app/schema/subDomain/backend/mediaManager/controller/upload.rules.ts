
import multer from 'multer';
import fs from 'fs-extra'
import { v4 as uuidv4 } from "uuid"

export const mediaManagerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let location = "./uploads/media-manager/"

      fs.mkdirsSync(location);

      callback(null, location);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, `${uuidv4()}-${file.originalname}`);
    }
  })
})
