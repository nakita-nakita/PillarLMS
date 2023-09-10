// const { errorHandler } = require("../../../../../../utils/errorHandling/sequelize.errorHandler");
// const makeRoleManyPermissionLogic = require("../../../preMain/backendRoleManyPermission.sql")
// const makeGet = require('../crud/get.script')

// module.exports = (db) => {
//   const roleManyPermissionLogic = makeRoleManyPermissionLogic(db)
//   const get = makeGet(db);

//   return ({ roleId, permissionId }) => {
//     return new Promise(async (resolve) => {

//       await roleManyPermissionLogic.deleteOnePermission({
//         roleId,
//         permissionId,
//       }).catch(errorHandler)

//       const data = await get({
//         id: roleId
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }
// }