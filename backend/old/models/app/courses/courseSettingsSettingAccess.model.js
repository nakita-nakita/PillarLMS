const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const CourseSettingsSettingAccess = sequelize.define(
    "courseSettingsSettingAccess",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    })
  );

  return CourseSettingsSettingAccess;
};
