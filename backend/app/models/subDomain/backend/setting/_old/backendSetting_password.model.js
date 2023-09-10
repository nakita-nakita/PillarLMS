module.exports = (sequelize, Sequelize) => {
  const backendSetting_password = sequelize.define(
    "backendSetting_password",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      passwordLength: {
        type: Sequelize.INTEGER,
        defaultValue: 6,
      },
      shouldHaveUppercaseLetter: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      shouldHaveLowercaseLetter: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      shouldHaveNumber: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      shouldHaveSymbol: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSetting_password;
};
