const load = (db) => {
  db.backendSetting_email = require("./backendSetting_email.model")(db.sequelize, db.Sequelize);
  db.backendSetting_general = require("./backendSetting_general.model")(db.sequelize, db.Sequelize);
  db.backendSetting_password = require("./backendSetting_password.model")(db.sequelize, db.Sequelize);
  db.backendSetting_backendUserRequest = require("./backend_setting_backendUserRequest.model")(db.sequelize, db.Sequelize);

}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}