
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesigner_pageTemplate', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    nickname: {
      type: sequelize.STRING,
      allowNull: false,
    },
    version: {
      type: sequelize.STRING,
      allowNull: false,
    },
    isReady: {
      type: sequelize.BOOLEAN
    },
    data: {
      type: sequelize.JSONB,
      allowNull: false,
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
  await queryInterface.dropTable('backendSiteDesigner_pageTemplate');
}

module.exports = { up, down };