
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('clientSitePageBrowser', {
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
        model: 'clientSitePage',
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
  await queryInterface.dropTable('clientSitePageBrowser');
}

module.exports = { up, down };