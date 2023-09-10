const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const settingsGeneral = sequelize.define("settingGeneral", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: Sequelize.STRING,
    },
    address1: {
      type: Sequelize.STRING,
    },
    address2: {
      type: Sequelize.STRING,
    },
    address3: {
      type: Sequelize.STRING,
    },
    address4: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    postal: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
    creatorITHelpSupportEmail: {
      type: Sequelize.STRING,
    },
  });

  return settingsGeneral;
};
