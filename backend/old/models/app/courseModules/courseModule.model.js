const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * Courses control access to the application features. Courses can belong to roles or users.
 * @typedef {Object} course
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    "courseModule",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      orderNumber: {
        type: Sequelize.INTEGER
      },
    })
  );

  return Course;
};
