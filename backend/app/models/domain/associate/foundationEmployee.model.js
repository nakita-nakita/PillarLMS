module.exports = (sequelize, Sequelize) => {
  const foundationEmployee = sequelize.define(
    "foundationEmployee",
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

  return foundationEmployee;
};
