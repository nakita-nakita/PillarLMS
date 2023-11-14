
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSettingHeaderBuiltIn', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },

    // GUI
    webAssetImport: {
      type: sequelize.STRING,
    },
    menuJsonB: {
      type: sequelize.JSONB,
    },

    //meta
    description: {
      type: sequelize.TEXT,
    },
    author: {
      type: sequelize.STRING,
    },
    authorLink: {
      type: sequelize.STRING,
    },

    // location
    name: {
      type: sequelize.STRING,
    },
    category: {
      type: sequelize.STRING,
    },
    theme: {
      type: sequelize.STRING,
    },

    //standard
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
  await queryInterface.dropTable('backendSettingHeaderBuiltIn');
}

module.exports = { up, down };