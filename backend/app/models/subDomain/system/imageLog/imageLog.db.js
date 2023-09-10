const load = (db) => {
  db.system_imageLog_userAvatar = require("./system_imageLog_userAvatar.model")(db.sequelize, db.Sequelize)
  db.system_imageLog_companyLogo = require("./system_imageLog_companyLogo.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {
  //logs
  db.backend_user.hasMany(db.system_imageLog_userAvatar, {
    foreignKey: {
      name: 'backend_user_id',
      allowNull: false
    },
  })
  db.system_imageLog_userAvatar.belongsTo(db.backend_user, {
    foreignKey: {
      name: 'backend_user_id',
      allowNull: false
    },
  })

  db.backend_user.hasMany(db.system_imageLog_companyLogo, {
    foreignKey: {
      name: 'backend_user_id',
      allowNull: false
    },
  })
  db.system_imageLog_companyLogo.belongsTo(db.backend_user, {
    foreignKey: {
      name: 'backend_user_id',
      allowNull: false
    },
  })

}

module.exports = {
  load,
  connect,
}