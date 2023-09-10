const { defaultsProperties } = require("../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const UserManyPermission = sequelize.define(
    "userManyPermisison",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    })
  );

  return UserManyPermission;
};
