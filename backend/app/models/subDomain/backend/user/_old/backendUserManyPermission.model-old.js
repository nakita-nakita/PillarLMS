module.exports = (sequelize, Sequelize) => {
  const backendUserManyPermission = sequelize.define(
    "backendUserManyPermission",
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

  return backendUserManyPermission;
};
