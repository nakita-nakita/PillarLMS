const load = (db) => {
  db.backendNotification = require("../backendNotification.model")(db.sequelize, db.Sequelize);
}

const connect = (db) => {
}

module.exports = {
  load,
  connect,
}