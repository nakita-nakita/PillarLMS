var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const settingPasswordMocked = dbMock.define('settingPassword', {
    passwordLength: 6,
    shouldHaveUppercaseLetter: true,
    shouldHaveLowercaseLetter: true,
    shouldHaveNumber: true,
    shouldHaveSymbol: true,
})

module.exports = { settingPasswordMocked };

