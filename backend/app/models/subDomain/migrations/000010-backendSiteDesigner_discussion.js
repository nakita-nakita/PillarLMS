
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesigner_discussion', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: sequelize.STRING,
    },
    post: {
      type: sequelize.STRING,
    },
    hasBeenEdited: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
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
  await queryInterface.dropTable('backendSiteDesigner_discussion');
}

module.exports = { up, down };