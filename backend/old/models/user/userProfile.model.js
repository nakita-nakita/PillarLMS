const { defaultsProperties } = require("../utils/model-properties.func");

/** 
 * The UserProfile is a one to one relationship with User.
 * @typedef {Object} userProfile
 * @property name {string}
 * @property birthday {string}
 * @property location {string}
 * @property website {string}
 * @property picture {string}
 */

module.exports = (sequelize, Sequelize) => {
  const UserProfile = sequelize.define(
    "userProfile",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
    })
  );

  return UserProfile;
};
