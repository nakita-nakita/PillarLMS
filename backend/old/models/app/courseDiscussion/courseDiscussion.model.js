const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * CourseDiscussions control access to the application features. CourseDiscussions can belong to roles or users.
 * @typedef {Object} courseDiscussion
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const CourseDiscussion = sequelize.define(
    "courseDiscussion",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.STRING
      },
      hasBeenEdited: {
        type: Sequelize.BOOLEAN
      }
      
    })
  );

  return CourseDiscussion;
};
