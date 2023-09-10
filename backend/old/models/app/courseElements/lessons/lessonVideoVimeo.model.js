const { defaultsProperties } = require("../../../utils/model-properties.func");

/** 
 * Use this entity to store vimeo lessons in course designer.
 * @typedef {Object} courseLessonVimeo
 * @property id {number}
 * @property vimeoVideoId {string}
 */

module.exports = (sequelize, Sequelize) => {
  const lessonVimeo = sequelize.define(
    "courseDesigner_LessonVimeo",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      vimeoVideoId: {
        type: Sequelize.STRING,
      },
    })
  );

  return lessonVimeo;
};
