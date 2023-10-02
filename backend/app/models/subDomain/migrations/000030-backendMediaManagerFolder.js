
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendMediaManagerFolder', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING
    },
    folderId: {
      type: sequelize.UUID,
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
    deletedBy: {
      type: sequelize.UUID,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
    createdBy: {
      type: sequelize.UUID,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendMediaManagerFolder');
}

module.exports = { up, down };