module.exports = (sequelize, Sequelize) => {
  const backendUserManyRole = sequelize.define(
    "backendUserManyRole",
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

  return backendUserManyRole;
};
