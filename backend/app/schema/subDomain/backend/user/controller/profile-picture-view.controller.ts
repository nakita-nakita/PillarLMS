import path from "path";

export default ({ app }) => {

  app.get('/backend/api/v1/profile/file/:user_id/:filename', (req, res) => {

    const fileName = path.join(process.cwd(), 'uploads', 'system', "profile", req.params.user_id, req.params.filename);

    if (fileName) {
      res.sendFile(fileName)
    } else {
      res.status(404)
    }
  })

}

