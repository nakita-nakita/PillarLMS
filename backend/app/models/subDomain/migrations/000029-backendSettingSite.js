
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSettingSite', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    favicon: {
      type: sequelize.STRING,
    },
    tab: {
      type: sequelize.STRING,
    },
    isReady: {
      type: sequelize.BOOLEAN,
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
  await queryInterface.dropTable('backendSettingSite');
}

module.exports = { up, down };