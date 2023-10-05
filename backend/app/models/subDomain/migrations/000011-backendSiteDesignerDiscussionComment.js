
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerDiscussionComment', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    post: {
      type: sequelize.STRING
    },
    hasBeenEdited: {
      type: sequelize.BOOLEAN,
      defaultValue: false
    },
    discussionId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'backendSiteDesignerDiscussion',
        key: 'id',
      }
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
  await queryInterface.dropTable('backendSiteDesignerDiscussionComment');
}

module.exports = { up, down };