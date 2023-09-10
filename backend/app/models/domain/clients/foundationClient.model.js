module.exports = (sequelize, Sequelize) => {
  const foundationClient = sequelize.define(
    "foundationClient",
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

  return foundationClient;
};
