const { defaultsProperties } = require("../../../utils/model-properties.func");

/** 
 * Use this entity to store youtube lessons in course designer.
 * @typedef {Object} courseLessonYoutube
 * @property id {number}
 * @property youtubeVideoId {string}
 */

module.exports = (sequelize, Sequelize) => {
  const lessonYoutube = sequelize.define(
    "courseDesigner_LessonYoutube",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
        // autoIncrement: true,
        // primaryKey: true,
      },
      youtubeVideoId: {
        type: Sequelize.STRING,
      },
    })
  );

  return lessonYoutube;
};
