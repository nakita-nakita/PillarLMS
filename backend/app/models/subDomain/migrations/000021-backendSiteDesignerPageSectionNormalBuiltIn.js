
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSiteDesignerPageSectionNormalBuiltIn', {
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
    category: {
      type: sequelize.ENUM("LIST", "IMAGE", "TEXT", "OTHER"),
    },
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
  await queryInterface.dropTable('backendSiteDesignerPageNormalSectionBuiltIn');
}

module.exports = { up, down };