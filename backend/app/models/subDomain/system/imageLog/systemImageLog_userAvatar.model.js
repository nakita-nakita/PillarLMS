/**
 * The user is an individual using the application.
 * @typedef {Image} log_image_user_avatar
 * @property id {number}
 * @property filename {string}
 */

module.exports = (sequelize, Sequelize) => {
  const systemImageLog_userAvatar = sequelize.define(
    "systemImageLog_userAvatar",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return systemImageLog_userAvatar;
};
