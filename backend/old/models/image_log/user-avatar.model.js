const { defaultsProperties } = require("../../utils/model-properties.func");

/**
 * The user is an individual using the application.
 * @typedef {Image} log_image_user_avatar
 * @property id {number}
 * @property filename {string}
 */

module.exports = (sequelize, Sequelize) => {
  const logImageUserAvatar = sequelize.define(
    "log_image_user_avatar",
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

  return logImageUserAvatar;
};
