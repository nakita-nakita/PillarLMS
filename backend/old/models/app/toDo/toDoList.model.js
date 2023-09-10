const { modelProperties: { defaultsProperties } } = require("../../utils");

/** 
 * This is the to do list.
 * @typedef {Object} toDoList
 * @property id {number}
 * @property name {string}
 */


module.exports = (sequelize, Sequelize) => {
  const toDoList = sequelize.define(
    "toDoList",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    })
  );

  return toDoList;
};
