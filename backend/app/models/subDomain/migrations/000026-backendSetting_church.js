
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSetting_church', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    logo: {
      type: sequelize.STRING,
      // type: sequelize.ENUM("ANYONE", "REQUEST_NO_PASSWORD", "REQUEST", "MANUAL"),
    },
    streetAddress: {
      type: sequelize.STRING,
    },
    suiteNumber: {
      type: sequelize.STRING,
    },
    zipCode: {
      type: sequelize.STRING,
    },
    city: {
      type: sequelize.STRING,
    },
    state: {
      type: sequelize.STRING,
    },
    socialTwitter: {
      type: sequelize.STRING,
    },
    socialFacebook: {
      type: sequelize.STRING,
    },
    socialInstagram: {
      type: sequelize.STRING,
    },
    socialWhatsapp: {
      type: sequelize.STRING,
    },
    socialTelegram: {
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
  await queryInterface.dropTable('backendSetting_backendUserRequest');
}

module.exports = { up, down };