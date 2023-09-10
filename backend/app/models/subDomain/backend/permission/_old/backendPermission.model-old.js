/** 
 * Permissions control access to the application features. Permissions can belong to roles or users.
 * @typedef {Object} permission
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const backendPermission = sequelize.define(
    "backendPermission",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendPermission;
};
