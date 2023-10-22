import path from "path";

export default ({ app }) => {

  app.get('/backend/api/v1/setting/link/preview/file/:year/:month/:filename', (req, res) => {
    
    const fileName = path.join(process.cwd(), 'uploads', 'temp', `${req.params.year}-${req.params.month}`, 'system', "backendSettingLink", "image", req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

}

