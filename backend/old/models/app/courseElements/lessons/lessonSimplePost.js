const { defaultsProperties } = require("../../../../utils/model-properties.func");

/** 
 * Use this entity to store simple post lessons in course designer.
 * @typedef {Object} courseLessonSimplePost
 * @property id {number}
 * @property post {string}
 */

module.exports = (sequelize, Sequelize) => {
  const lessonSimplePost = sequelize.define(
    "courseDesigner_LessonSimplePost",
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
        type: Sequelize.STRING,
      },
    })
  );

  return lessonSimplePost;
};
