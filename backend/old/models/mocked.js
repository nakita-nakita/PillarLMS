const db = {};
var SequelizeMock = require('sequelize-mock')

db.Sequelize = SequelizeMock;
db.Sequelize.Op = {
    like: "like"
}

// app - toDo
db.toDo = require("./app/toDo/toDo.model.mocked").mocked
db.toDoList = require("./app/toDo/toDoList.model.mocked").mocked
// db.toDoListManyToDo = require("./app/toDo/toDoListManyToDo.model.mocked").mocked


db.permission = require("./user/permission.model.mocked").permissionMocked
db.userManyPermission = require("./user/userManyPermission.model.mocked").userManyPermissionMocked
db.userManyRole = require("./user/userManyRole.model.mocked").userManyRoleMocked
db.roleManyPermission = require("./user/roleManyPermission.model.mocked").roleManyPermissionMocked
db.role = require("./user/role.model.mocked").roleMocked
db.user = require("./user/user.model.mocked").userMocked
db.userProfile = require("./user/userProfile.model.mocked").userProfileMocked
db.userRequest = require("./user/userRequest.model.mocked").userRequestMocked

db.settingEmail = require("./app/settings/settingEmail.model.mocked").settingEmailMocked
db.settingGeneral = require("./app/settings/settingGeneral.model.mocked").settingGeneralMocked
db.settingPassword = require("./app/settings/settingPassword.model.mocked").settingPasswordMocked
db.settingRequest = require("./app/settings/settingRequest.model.mocked").settingRequestMocked

module.exports = db;