
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSetting_links', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    donationLink: {
      type: sequelize.STRING,
    },
    virtualServicesLink: {
      type: sequelize.STRING,
    },
    defaultMetaPicture: {
      type: sequelize.STRING,
    },
    defaultMetaTitle: {
      type: sequelize.STRING,
    },
    defaultMetaDescription: {
      type: sequelize.STRING,
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
  await queryInterface.dropTable('backendSetting_lookUp');
}

module.exports = { up, down };