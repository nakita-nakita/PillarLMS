
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendSetting_colors', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    color1: {
      type: sequelize.STRING,
    },
    color2: {
      type: sequelize.STRING,
    },
    color3: {
      type: sequelize.STRING,
    },
    color4: {
      type: sequelize.STRING,
    },
    color5: {
      type: sequelize.STRING,
    },
    lightBackgroundColor: {
      type: sequelize.STRING,
    },
    lightTextColor: {
      type: sequelize.STRING,
    },
    darkBackgroundColor: {
      type: sequelize.STRING,
    },
    darkTextColor: {
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
  await queryInterface.dropTable('backendSetting_email');
}

module.exports = { up, down };