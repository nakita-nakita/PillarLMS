/** 
 * Roles are used to group permissions. Roles can be attached to User Types.
 * @typedef {Object} role
 * @property id {number}
 * @property name {string}
 * @property permissionMany {Array<permission>}
 */

module.exports = (sequelize, Sequelize) => {
  const backendRole = sequelize.define(
    "backendRole",
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

  return backendRole;
};
