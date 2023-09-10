module.exports = (sequelize, Sequelize) => {
  const backendSiteDesignerSetting_readAccess = sequelize.define(
    "backendSiteDesignerSetting_readAccess",
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

  return backendSiteDesignerSetting_readAccess;
};
