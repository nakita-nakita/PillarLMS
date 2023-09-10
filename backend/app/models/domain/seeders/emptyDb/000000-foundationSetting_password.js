const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('foundationSetting_password', [
    {
      id: uuidv4(),
      passwordLength: 6,
      shouldHaveUppercaseLetter: true,
      shouldHaveLowercaseLetter: true,
      shouldHaveNumber: true,
      shouldHaveSymbol: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
}

module.exports = { up, down };
