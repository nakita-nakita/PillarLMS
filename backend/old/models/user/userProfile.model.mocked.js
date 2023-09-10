var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const userProfileMocked = dbMock.define('userProfile', {
    name: "Bugs Bunny",
    birthday: "1/12/21",
    location: "Acme Headquaters",
    website: "bugsbunny.acme",
})

module.exports = { userProfileMocked };

