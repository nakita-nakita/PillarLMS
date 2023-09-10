const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * This model is used for changing the sign up feature. It can
 * @typedef {Object} settingRequest
 * @property id {number}
 * @property type {("ANYONE" | "REQUEST_NO_PASSWORD" | "REQUEST" | "MANUAL")}
 * @property password {string}
 */

module.exports = (sequelize, Sequelize) => {
  const settingsRequest = sequelize.define("settingRequest", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.ENUM("ANYONE", "REQUEST_NO_PASSWORD", "REQUEST", "MANUAL"),
      defaultValue: "ANYONE",
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: "Password",
    },
  });

  return settingsRequest;
};
