module.exports = (sequelize, Sequelize) => {
  const backendSiteDesignerSetting = sequelize.define(
    "backendSiteDesignerSetting",
    {
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
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSiteDesignerSetting;
};
