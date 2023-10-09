
import multer from 'multer';
import fs from 'fs-extra'
import { v4 as uuidv4 } from "uuid"
import path from 'path';

export const previewProfileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {

      const location = path.join(process.cwd(), 'uploads', 'temp', 'system', "profile", req.user.id)

      fs.mkdirsSync(location);

      callback(null, location);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, `${uuidv4()}-${file.originalname}`);
    }
  })
})
