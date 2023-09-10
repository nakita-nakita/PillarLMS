const { defaultsProperties } = require("../utils/model-properties.func");

/** 
 * Roles are used to group permissions. Roles can be attached to User Types.
 * @typedef {Object} role
 * @property id {number}
 * @property name {string}
 * @property permissionMany {Array<permission>}
 */

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "role",
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

  return Role;
};
