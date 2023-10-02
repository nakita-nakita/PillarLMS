import path from "path";

export default ({ app }) => {

    app.get('/api/v1/media-manager/file/:filename', (req, res) => {

        const fileName = path.join(process.cwd(), 'uploads', 'media-manager', req.params.filename);
    
        if (fileName) {
          res.sendFile(fileName)
        } else {
          res.status(404)
        }
      })
    
  }

