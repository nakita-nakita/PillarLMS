const { defaultsProperties } = require("../../utils/model-properties.func");

module.exports = (sequelize, Sequelize) => {
  const CourseSettings = sequelize.define(
    "courseSettings",
    defaultsProperties(Sequelize, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      canAllCreatorsRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      canAllCreatorsUpdate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      

    })
  );

  return CourseSettings;
};
