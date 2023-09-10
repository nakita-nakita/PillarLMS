const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const Logs = sequelize.define(
    "logs",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM("ERROR", "TRACE"),
        defaultValue: "ERROR",
      },
      application: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stack: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    })
  );

  return Logs;
};
