const load = (db) => {
  db.backendUser = require("../backendUser.model-old.js")(db.sequelize, db.Sequelize);
  db.backendUserManyPermission = require("../backendUserManyPermission.model-old")(db.sequelize, db.Sequelize);
  db.backendUserManyRole = require("../backendUserManyRole.model-old")(db.sequelize, db.Sequelize);
}

const connect = (db) => {

  // Backend user has notifications
  db.backendUser.hasMany(db.backendNotification, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })
  db.backendNotification.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Backend user has Many to Many with permissions. Part 1
  db.backendUser.hasMany(db.backendUserManyPermission, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })
  db.backendUserManyPermission.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Backend user has Many to Many with permissions. Part: 2
  db.backendPermission.hasMany(db.backendUserManyPermission, {
    foreignKey: {
      name: 'backendPermissionId',
      allowNull: false
    },
  })
  db.backendUserManyPermission.belongsTo(db.backendPermission, {
    foreignKey: {
      name: 'backendPermissionId',
      allowNull: false
    },
  })

  // Backend user has Many to Many with Role Part: 1
  db.backendUser.hasMany(db.backendUserManyRole, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })
  db.backendUserManyRole.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Backend user has Many to Many with Role Part: 2
  db.backendRole.hasMany(db.backendUserManyRole, {
    foreignKey: {
      name: 'backendRoleId',
      allowNull: false
    },
  })
  db.backendUserManyRole.belongsTo(db.backendRole, {
    foreignKey: {
      name: 'backendRoleId',
      allowNull: false
    },
  })
}

module.exports = {
  load,
  connect,
}