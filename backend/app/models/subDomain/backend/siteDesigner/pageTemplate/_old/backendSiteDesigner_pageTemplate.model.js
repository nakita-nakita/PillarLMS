module.exports = (sequelize, Sequelize) => {
  const backendSiteDesigner_pageTemplate = sequelize.define(
    "backendSiteDesigner_pageTemplate",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      data: {
        type: Sequelize.JSONB,
      },
      homePageData: {
        type: Sequelize.JSONB,
      },
      isHomeDataAvailable: {
        type: Sequelize.BOOLEAN
      },
      isReady: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSiteDesigner_pageTemplate;
};
