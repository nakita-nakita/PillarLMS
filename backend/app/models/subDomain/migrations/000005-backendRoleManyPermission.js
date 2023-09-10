
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendRoleManyPermission', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendRole',
        key: 'id',
      }
    },
    permissionId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendPermission',
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
  await queryInterface.dropTable('backendRoleManyPermission');
}

module.exports = { up, down };