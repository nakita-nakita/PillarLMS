const { defaultsProperties } = require("../../utils/model-properties.func");

/** 
 * Courses control access to the application features. Courses can belong to roles or users.
 * @typedef {Object} course
 * @property id {number}
 * @property name {string}
 */

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define(
    "courseLesson",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      orderNumber: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM("LESSON_VIDEO_YOUTUBE", "LESSON_QUIZ", "LESSON_EXAM", "LESSON_PAGEBUILDER", "LESSON_PAGE_SIMPLE", "LESSON_VIDEO_VIMEO"),
      },
      entityReferenceId: {
        type: Sequelize.UUID,
      },
      isReady: {
        type: Sequelize.BOOLEAN
      }

    })
  );

  return Course;
};
