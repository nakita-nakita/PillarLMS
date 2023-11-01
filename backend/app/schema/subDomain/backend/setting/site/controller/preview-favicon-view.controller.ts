import path from "path";

export default ({ app }) => {

  app.get('/backend/api/v1/setting/site/preview/file/:year/:month/:filename', (req, res) => {
    
    const fileName = path.join(process.cwd(), 'uploads', 'temp', `${req.params.year}-${req.params.month}`, 'system', "backendSettingSite", "favicon", req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

}

