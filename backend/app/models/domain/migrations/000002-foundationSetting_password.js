
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('foundationSetting_password', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    passwordLength: {
      type: sequelize.INTEGER,
      defaultValue: 6,
    },
    shouldHaveUppercaseLetter: {
      type: sequelize.BOOLEAN,
      defaultValue: true,
    },
    shouldHaveLowercaseLetter: {
      type: sequelize.BOOLEAN,
      defaultValue: true,
    },
    shouldHaveNumber: {
      type: sequelize.BOOLEAN,
      defaultValue: true,
    },
    shouldHaveSymbol: {
      type: sequelize.BOOLEAN,
      defaultValue: true,
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
  await queryInterface.dropTable('backendSetting_password');
}

module.exports = { up, down };