const { defaultsProperties } = require("../utils/model-properties.func");

/** 
 * Notifications control access to the application features. Notifications can belong to roles or users.
 * @typedef {Object} notifications
 * @property id {number}
 * @property type {{ "SYSTEM" | "DISCUSSION"}}
 * @property message {string}
 * @property locationMessage {string}
 * @property hasBeenSeen {boolean}
 * @property hasBeenClicked {boolean}
 * @property url {string}
 */

module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define(
    "notification",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM("SYSTEM", "DISCUSSION"),
        allowNull: false,
        
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      locationMessage: {
        type: Sequelize.STRING,
        
      },
      hasBeenSeen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        
      },
      hasBeenClicked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,

      },
    })
  );

  return Notification;
};
