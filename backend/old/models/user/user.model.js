const { defaultsProperties } = require("../utils/model-properties.func");
/**
 * @typedef {Object} searchParam
 * @property q {Object} 
 * @property page {number}     
 * @property pageSize {number}  
 */

/**
 * 
 * @template T
 * @typedef {Object} pagination
 * @property count {number}
 * @property page {number}
 * @property pageSize {number}
 * @property pageCount {number}
 * @property rows {Array<T>} 
 */

/**
 * The user is an individual using the application.
 * @typedef {Object} user
 * @property id {number}
 * @property username {string}
 * @property email {string}
 * @property password {string} - Encrypted
 * @property profile {UserProfile}
 */

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isCreator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  );

  return User;
};
