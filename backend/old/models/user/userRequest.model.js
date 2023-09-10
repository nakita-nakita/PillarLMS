const { defaultsProperties } = require("../utils/model-properties.func");

/** 
 * Roles are used to group permissions. Roles can be attached to User Types.
 * @typedef {Object} userRequest
 * @property id {number}
 * @property email {string}
 * @property username {string}
 * @property name {string}
 * @property status {("PENDING" | "ACCEPTED" | "REJECTED")}
 */

module.exports = (sequelize, Sequelize) => {
  const UserRequest = sequelize.define(
    "userRequest",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED"),
        defaultValue: "PENDING",
      },
    })
  );

  return UserRequest;
};
