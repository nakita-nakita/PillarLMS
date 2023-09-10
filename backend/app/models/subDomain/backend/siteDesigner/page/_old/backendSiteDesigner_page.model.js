module.exports = (sequelize, Sequelize) => {
  const backendSiteDesigner_page = sequelize.define(
    "backendSiteDesigner_page",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false,
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

  return backendSiteDesigner_page;
};
