
// import multer from 'multer';
// import fs from 'fs-extra'
// import { v4 as uuidv4 } from "uuid"
// import path from 'path';

// export const previewImageUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {

//       const currentDate = new Date();
//       const year = currentDate.getFullYear(); // will get you a four-digit year
//       const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // will get you a two-digit month
      
//       const location = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "backendSettingLink", "image");
      
//       fs.mkdirsSync(location);

//       callback(null, location);
//     },
//     filename: (req, file, callback) => {
//       //originalname is the uploaded file's name with extn
//       callback(null, `${uuidv4()}-${file.originalname}`);
//     }
//   })
// })
