
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendNotification', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    message: {
      type: sequelize.STRING,
      allowNull: false,
    },
    hasBeenSeen: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    hasBeenClicked: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    action: {
      type: sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendUser',
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
  await queryInterface.dropTable('backendNotification');
}

module.exports = { up, down };