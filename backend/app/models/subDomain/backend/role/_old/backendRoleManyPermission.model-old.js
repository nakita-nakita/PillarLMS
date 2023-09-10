module.exports = (sequelize, Sequelize) => {
  const backendRoleManyPermission = sequelize.define(
    "backendRoleManyPermission",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendRoleManyPermission;
};
