module.exports = (sequelize, Sequelize) => {
  const backendUser = sequelize.define(
    "backendUser",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendUser;
};
