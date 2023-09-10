/** 
 * This model is used for changing the sign up feature. It can
 * @typedef {Object} settingRequest
 * @property id {number}
 * @property type {("ANYONE" | "REQUEST_NO_PASSWORD" | "REQUEST" | "MANUAL")}
 * @property password {string}
 */

module.exports = (sequelize, Sequelize) => {
  const backendSetting_backendUserRequest = sequelize.define(
    "backendSetting_backendUserRequest",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSetting_backendUserRequest;
};
