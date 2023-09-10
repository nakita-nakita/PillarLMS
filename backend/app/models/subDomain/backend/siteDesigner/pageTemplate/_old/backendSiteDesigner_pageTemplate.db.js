const load = (db) => {
  db.backendSiteDesigner_pageTemplate = require("../backendSiteDesigner_pageTemplate.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {

}

module.exports = {
  load,
  connect,
}