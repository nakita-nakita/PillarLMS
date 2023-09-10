const load = (db) => {
  db.foundationEmployee = require("./foundationEmployee.model")(db.sequelize, db.Sequelize);
}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}