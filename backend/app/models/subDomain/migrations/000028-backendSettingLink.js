
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSettingLink', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: sequelize.STRING,
    },
    description: {
      type: sequelize.STRING,
    },
    image: {
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
  await queryInterface.dropTable('backendSettingLink');
}

module.exports = { up, down };