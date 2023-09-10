const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendPermission', [
    {
      id: uuidv4(),
      name: 'backend-siteDesigner-read',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'backend-siteDesigner-update',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'backend-siteDesigner-setting',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendPermission', {
    [Op.or]: [
      {
        name: 'backend-siteDesigner-read'
      },
      {
        name: 'backend-siteDesigner-update'
      },
      {
        name: 'backend-siteDesigner-update'
      },
    ]
  });
}

module.exports = { up, down };


// export default {
//   up: async (queryInterface) => queryInterface.bulkInsert('backendPermission', [
//     {
//       name: 'backend-siteDesigner-read',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       name: 'backend-siteDesigner-update',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       name: 'backend-siteDesigner-setting',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//   ], {}),
//   down: async (queryInterface) => {
//     await queryInterface.bulkDelete('Currencies', {
//       [Op.or]: [
//         {
//           name: 'backend-siteDesigner-read'
//         }, 
//         {
//           name: 'backend-siteDesigner-update'
//         },
//         {
//           name: 'backend-siteDesigner-update'
//         },
//       ]
//     });
//   }
// };


// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
//   await queryInterface.createTable('backendPermission', {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     deletedAt: {
//       allowNull: true,
//       type: Sequelize.DATE
//     },
//   });
// }

// async function down({ context: queryInterface }) {
//   await queryInterface.dropTable('backendPermissions');
// }

// module.exports = { up, down };