
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('backendPermission', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    userId: {
      type: sequelize.UUID,
      references: {
        model: 'backendUser',
        key: 'id',
      }
    },
    roleId: {
      type: sequelize.UUID,
      references: {
        model: 'backendRole',
        key: 'id',
      }
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
  await queryInterface.dropTable('backendPermissions');
}

module.exports = { up, down };
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, sequelize) {
//     await queryInterface.createTable('backendPermission', {
//       id: {
//         type: sequelize.UUID,
//         defaultValue: sequelize.UUIDV4,
//         primaryKey: true,
//       },
//       name: {
//         type: sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: sequelize.DATE
//       },
//       deletedAt: {
//         allowNull: true,
//         type: sequelize.DATE
//       },
//     });
//   },
//   async down(queryInterface, sequelize) {
//     await queryInterface.dropTable('backendPermissions');
//   }
// };