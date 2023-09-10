const { defaultsProperties } = require("../utils/model-properties.func");

/**
 * The log of the logo of the company uploaded in the application.
 * @typedef {Image} log_image_company_logo
 * @property id {number}
 * @property filename {string}
 */

module.exports = (sequelize, Sequelize) => {
  const logImageCompanyLogo = sequelize.define(
    "log_image_company_logo",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })
  );

  return logImageCompanyLogo;
};
