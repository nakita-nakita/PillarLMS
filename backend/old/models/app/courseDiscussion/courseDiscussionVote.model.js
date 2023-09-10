const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * CourseDiscussionVotes control access to the application features. CourseDiscussionVotes can belong to roles or users.
 * @typedef {Object} courseDiscussionVote
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const CourseDiscussionVote = sequelize.define(
    "courseDiscussionVote",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      vote: { // 1, 0, or -1
        type: Sequelize.SMALLINT,
        allowNull: false,
        default: false,

      },

    })
  );

  return CourseDiscussionVote;
};
