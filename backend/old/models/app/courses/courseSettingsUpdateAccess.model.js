const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const CourseSettingsUpdateAccess = sequelize.define(
    "courseSettingsUpdateAccess",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    })
  );

  return CourseSettingsUpdateAccess;
};
