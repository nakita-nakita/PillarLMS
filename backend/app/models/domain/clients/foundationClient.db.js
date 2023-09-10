const load = (db) => {
  db.foundationClient = require("./foundationClient.model")(db.sequelize, db.Sequelize);
}

const connect = (db) => {
}

module.exports = {
  load,
  connect,
}