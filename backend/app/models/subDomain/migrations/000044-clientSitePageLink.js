
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('clientSitePageLink', {
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
    picture: {
      type: sequelize.STRING,
    },
    pictureAlt: {
      type: sequelize.STRING,
    },
    pageId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: 'clientSitePage',
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
  await queryInterface.dropTable('clientSitePageLink');
}

module.exports = { up, down };