
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerPageBrowser', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    tabName: {
      type: sequelize.STRING,
    },
    pageId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendSiteDesignerPage',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    deletedAt: {
      type: sequelize.DATE
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendSiteDesignerPage');
}

module.exports = { up, down };