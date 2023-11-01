import path from "path";

export default ({ app }) => {
  app.get('/backend/api/v1/setting/site/file/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'system', "backendSettingSite", "favicon", req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

}

