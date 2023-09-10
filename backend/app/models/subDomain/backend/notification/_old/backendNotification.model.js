/** 
 * The Notification Object for the backend user.
 * @typedef {Object} backendNotification
 * @property id {number}
 * @property type {{ "SYSTEM" | "DISCUSSION"}}
 * @property message {string}
 * @property locationMessage {string}
 * @property hasBeenSeen {boolean}
 * @property hasBeenClicked {boolean}
 * @property url {string}
 */

module.exports = (sequelize, Sequelize) => {
  const backendNotification = sequelize.define(
    "backendNotification",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendNotification;
};
