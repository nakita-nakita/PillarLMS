const load = (db) => {
  db.backendSiteDesignerSetting = require("./backendSiteDesignerSetting.model")(db.sequelize, db.Sequelize)
  db.backendSiteDesignerSetting_readAccess = require("./backendSiteDesignerSetting_readAccess.model")(db.sequelize, db.Sequelize)
  db.backendSiteDesignerSetting_settingAccess = require("./backendSiteDesignerSetting_settingAccess.model")(db.sequelize, db.Sequelize)
  db.backendSiteDesignerSetting_updateAccess = require("./backendSiteDesignerSetting_updateAccess.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {

  // Many Users - Many Courses Access
  // Read
  db.backendUser.hasMany(db.backendSiteDesignerSetting_readAccess, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesignerSetting_readAccess.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Setting
  db.backendUser.hasMany(db.backendSiteDesignerSetting_settingAccess, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesignerSetting_settingAccess.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Update
  db.backendUser.hasMany(db.backendSiteDesignerSetting_updateAccess, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesignerSetting_updateAccess.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })
}

module.exports = {
  load,
  connect,
}