const load = (db) => {
  db.backendRole = require("../backendRole.model.js")(db.sequelize, db.Sequelize);
  db.backendRoleManyPermission = require("../backendRoleManyPermission.model")(db.sequelize, db.Sequelize);
}

const connect = (db) => {
  // Backend roles has Many to Many with permission Part: 2
  db.backendRole.hasMany(db.backendRoleManyPermission, {
    foreignKey: {
      name: 'backendRoleId',
      allowNull: false
    },
  })
  db.backendRoleManyPermission.belongsTo(db.backendRole, {
    foreignKey: {
      name: 'backendRoleId',
      allowNull: false
    },
  })

  // Permissions Many to Many with Roles Part: 1
  db.backendPermission.hasMany(db.backendRoleManyPermission, {
    foreignKey: {
      name: 'backendPermissionId',
      allowNull: false
    },
  })
  db.backendRoleManyPermission.belongsTo(db.backendPermission, {
    foreignKey: {
      name: 'backendPermissionId',
      allowNull: false
    },
  })
}

module.exports = {
  load,
  connect,
}