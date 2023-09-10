const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const settingsPassword = sequelize.define("settingPassword", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
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
  });

  return settingsPassword;
};
