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
  const foundationUser = sequelize.define(
    "foundationUser",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return foundationUser;
};
