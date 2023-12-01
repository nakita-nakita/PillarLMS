
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSettingHeader', {
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
    userAnswersJsonB: {
      type: sequelize.JSONB,
    },
    isReady: {
      type: sequelize.BOOLEAN,
    },
    
    //selection
    selectionType: {
      type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
    },
    selectionId: {
      type: sequelize.UUID,
    },

    // standard
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
  await queryInterface.dropTable('backendSettingHeader');
}

module.exports = { up, down };