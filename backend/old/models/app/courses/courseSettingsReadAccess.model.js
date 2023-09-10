const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const CourseSettingsReadAccess = sequelize.define(
    "courseSettingsReadAccess",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    })
  );

  return CourseSettingsReadAccess;
};
