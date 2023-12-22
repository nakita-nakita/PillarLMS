
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('clientSiteHeader', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    
    // GUI
    webAssetImport: {
      type: sequelize.STRING,
    },
    userAnswersJsonB: {
      type: sequelize.JSONB,
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
  await queryInterface.dropTable('clientSiteHeader');
}

module.exports = { up, down };