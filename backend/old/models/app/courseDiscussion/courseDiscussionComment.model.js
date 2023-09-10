const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * CourseDiscussionComments control access to the application features. CourseDiscussionComments can belong to roles or users.
 * @typedef {Object} courseDiscussionComment
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const CourseDiscussionComment = sequelize.define(
    "courseDiscussionComment",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      post: {
        type: Sequelize.STRING
      },
      hasBeenEdited: {
        type: Sequelize.BOOLEAN
      }

      

    })
  );

  return CourseDiscussionComment;
};
