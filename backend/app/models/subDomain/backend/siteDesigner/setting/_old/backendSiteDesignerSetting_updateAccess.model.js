module.exports = (sequelize, Sequelize) => {
  const backendSiteDesignerSetting_updateAccess = sequelize.define(
    "backendSiteDesignerSetting_updateAccess",
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

  return backendSiteDesignerSetting_updateAccess;
};
