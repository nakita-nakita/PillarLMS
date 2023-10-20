import path from "path";

export default ({ app }) => {

  app.get('/backend/api/v1/logo/file/:filename', (req, res) => {

    
    const fileName = path.join(process.cwd(), 'uploads', 'system', "logo", req.params.filename);
    
    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

}

