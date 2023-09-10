const load = (db) => {
  db.frontend_user = require("./frontendUser.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}