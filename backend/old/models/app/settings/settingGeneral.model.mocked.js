var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const settingGeneralMocked = dbMock.define('settingGeneral', {
    companyName: "companyName",
    address1: "address1",
    address2: "address2",
    address3: "address3",
    address4: "address4",
    city: "city",
    country: "country",
    postal: "postal",
    phone: "phone"
})

module.exports = { settingGeneralMocked };

