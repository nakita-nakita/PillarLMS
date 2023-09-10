const { defaultsProperties } = require("../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const RoleManyPermissions = sequelize.define(
    "roleManyPermission",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    })
  );

  return RoleManyPermissions;
};
