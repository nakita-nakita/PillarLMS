
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('foundationUser', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: sequelize.STRING,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    isDeactivated: {
      type: sequelize.BOOLEAN,
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
      allowNull: true,
      type: sequelize.DATE
    },
  }, {
    uniqueKeys: {
      Items_unique: {
        fields: ['email']
      }
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('foundationUser');
}

module.exports = { up, down };