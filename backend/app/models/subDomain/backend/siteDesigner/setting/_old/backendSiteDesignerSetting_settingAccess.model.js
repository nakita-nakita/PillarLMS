module.exports = (sequelize, Sequelize) => {
  const backendSiteDesignerSetting_settingAccess = sequelize.define(
    "backendSiteDesignerSetting_settingAccess",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSiteDesignerSetting_settingAccess;
};
