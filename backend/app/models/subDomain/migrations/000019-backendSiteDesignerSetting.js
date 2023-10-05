
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerSetting', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    canAllRead: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    canAllUpdate: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE,
    },
    deletedAt: {
      type: sequelize.DATE,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendSiteDesignerSetting');
}

module.exports = { up, down };