module.exports = (sequelize, Sequelize) => {
  const frontendUser = sequelize.define(
    "frontendUser",
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

  return frontendUser;
};
