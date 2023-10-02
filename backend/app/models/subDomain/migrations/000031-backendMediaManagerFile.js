
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendMediaManagerFile', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    userFileName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    systemFileName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: sequelize.STRING,
      allowNull: false,
    },
    folderId: {
      type: sequelize.UUID,
      references: {
        model: 'backendMediaManagerFolder',
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
    deletedBy: {
      type: sequelize.UUID,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
    uploadedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('backendMediaManagerFile');
}

module.exports = { up, down };