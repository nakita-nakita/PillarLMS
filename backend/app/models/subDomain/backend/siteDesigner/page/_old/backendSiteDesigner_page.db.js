const load = (db) => {
  db.backendSiteDesigner_page = require("../backendSiteDesigner_page.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}