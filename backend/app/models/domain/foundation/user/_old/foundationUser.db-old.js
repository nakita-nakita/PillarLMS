const load = (db) => {
  db.foundationUser = require("../foundationUser.model.js")(db.sequelize, db.Sequelize);
  db.foundationUserProfile = require("../foundationUserProfile.model-old")(db.sequelize, db.Sequelize);
}

const connect = (db) => {
  // Every User in the system has a profile
  db.foundationUser.hasOne(db.foundationUserProfile, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })
  db.foundationUserProfile.belongsTo(db.foundationUser, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })

  // User can become client
  db.foundationUser.hasOne(db.foundationClient, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })
  db.foundationClient.belongsTo(db.foundationUser, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })


  // User can become employee
  db.foundationUser.hasOne(db.foundationEmployee, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })
  db.foundationEmployee.belongsTo(db.foundationUser, {
    foreignKey: {
      name: 'foundationUserid',
      allowNull: false
    },
  })


}

module.exports = {
  load,
  connect,
}