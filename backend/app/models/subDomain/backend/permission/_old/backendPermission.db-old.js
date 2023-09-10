const load = (db) => {
  db.backendPermission = require("./backendPermission.model.js")(db.sequelize, db.Sequelize);

}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}