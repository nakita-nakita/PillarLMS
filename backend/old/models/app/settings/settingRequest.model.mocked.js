var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const settingRequestMocked = dbMock.define('settingRequest', {
    type: "ANYONE",
    password: "Password"
})

module.exports = { settingRequestMocked };

