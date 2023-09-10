const { defaultsProperties } = require("../utils/model-properties.func");

/** 
 * Permissions control access to the application features. Permissions can belong to roles or users.
 * @typedef {Object} permission
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define(
    "permission",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    })
  );

  return Permission;
};
