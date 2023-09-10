const { modelProperties: { defaultsProperties } } = require("../../../utils");

/** 
 * This is the to do object.
 * @typedef {Object} toDo
 * @property id {number}
 * @property title {string}
 * @property dueDate {string}
 * @property isCompleted {boolean}
 */


module.exports = (sequelize, Sequelize) => {
  const toDos = sequelize.define(
    "toDo",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dueDate: {
          type: Sequelize.DATE
      },
      isCompleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
    })
  );

  return toDos;
};
