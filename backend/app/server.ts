require("dotenv").config();
import makeApp from "./app"
// const db = require("./models/domain");

makeApp().then((app) => {

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})
