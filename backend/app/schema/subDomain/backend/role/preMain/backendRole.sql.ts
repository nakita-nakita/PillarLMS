import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendRoleSql(d: d_sub) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}

// /**
//  * The functions responsible for handling the user type.
//  * @module role_logic
//  */
// const { errorHandler } = require("../../../../utils/errorHandling/sequelize.errorHandler");


// module.exports = (db) => {
//   const Op = db.Sequelize.Op;
//   /**
//    * Find a role by Id.
//    * @param {Object} idObject - {id: 1} 
//    * @returns {role}
//    * @example 
//    *  await roleLogic.getOneById({
//    *    id
//    *  })
//    */
//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const record = await db.backend_role.findOne({
//         where: {
//           id,
//         },
//         raw: true,
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: record
//       });
//     });
//   }

//   /**
//    * Find many roles with pagination.
//    * @param {searchParam} paginationObject - {q, page, pageSize}
//    * @returns {pagination<role>}
//    * @example 
//    *  await roleLogic.getManyWithPagination({
//    *    q: "search",
//    *    page: 2,
//    *    pageSize:2
//    *  })
//    */
//   const getManyWithPagination = ({ q, page, pageSize, userId }) => {
//     return new Promise(async (resolve) => {

//       page = page ? page - 1 : 0;
//       pageSize = pageSize || 10;

//       if (page < 0) {
//         return resolve({
//           success: false,
//           error: {
//             devMessage: "Please start the page at 1."
//           }
//         });
//       }

//       if (pageSize < 0 || pageSize >= 100) {
//         return resolve({
//           success: false,
//           error: {
//             devMessage: "Please keep pageSize inbetween 1 - 100."
//           }
//         });
//       }

//       const offset = page * pageSize;
//       const limit = pageSize;

//       let search = {};

//       if (userId) {
//         search = {
//           ...search,
//           include: {
//             model: db.userManyRole,
//             where: { userId },
//           }
//         }
//       }

//       if (q) {
//         search.where = {
//           ...search.where,
//           name: {
//             [Op.like]: "%" + q + "%",
//           }
//         }
//       }

//       search.offset = offset;
//       search.limit = limit;
//       search.raw = true;

//       const roles = await db.backend_role.findAndCountAll(search).catch(errorHandler)
//       roles.page = page + 1;
//       roles.pageSize = pageSize;
//       roles.pageCount = Math.ceil(roles.count / roles.pageSize);

//       resolve({
//         success: true,
//         data: roles
//       });
//     });
//   }


//   /**
//    * Save a role. This includes the permissions.
//    * @param {role} roleObject - { name, roleMany } It takes all the "user" properties except id.
//    * @returns {role} - It returns the same object but with an id.
//    * @example 
//    *  await roleLogic.addOne({
//    *    name: "name",
//    *    permissionMany: [{id:2}]
//    *  })
//    */
//   const addOne = ({ name }) => {
//     return new Promise(async (resolve) => {

//       const newRole = await db.backend_role.create({ name }).catch(errorHandler);

//       resolve({
//         success: true,
//         data: newRole.dataValues
//       })
//     })
//   }

//   /**
//    * Save many roles. This includes the permissions.
//    * @param {Array<role>} ArrayOfRoles - [{ name, roleMany }] It takes all the "role" properties except id.
//    * @returns {boolean} - The result is true or false for the completion of the saves.
//    * @example 
//    *  await roleLogic.addMany([{
//    *    name: "name",
//    *    permissionMany: [{id:2}]
//    *  }])
//    */
//   const addMany = ({ roleNamesArray }) => {
//     return new Promise(async (resolve) => {

//       const data = await db.backend_role.bulkCreate(roleNamesArray.map(roleName => ({
//         name: roleName,
//       }))).catch(errorHandler)

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }

//   /**
//    * Update a role. There is no functionality for updating permissions here.
//    * @param {role} roleObject - { id, name } It takes all the "role" properties. Id is required.
//    * @returns {role} 
//    * @example 
//    *  await roleLogic.updateOne([{
//    *    id,
//    *    name: "name",
//    *  }])
//    */
//   const updateOne = ({ id, name }) => {
//     return new Promise(async (resolve) => {

//       const role = await db.backend_role.update(
//         { name, },
//         {
//           where: { id, },
//           returning: true,
//           raw: true,
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: role[0] !== 0 ? role[1][0] : null
//       })
//     })
//   }

//   /**
//    * Delete a role. A soft delete from the column "is_deleted" becoming true.
//    * @param {Object} idObject - { id } Id is required.
//    * @returns {user} 
//    * @example 
//    *  await roleLogic.deleteOne({
//    *    id,
//    *  })
//    */
//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve) => {

//       const role = await db.backend_role.update(
//         { isDeleted: true },
//         {
//           where: { id, },
//           returning: true,
//           raw: true,
//           // plain: true,
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: role[0] !== 0 ? role[1][0] : null
//       })
//     })
//   }

//   return {
//     getOneById,
//     getManyWithPagination,
//     addOne,
//     addMany,
//     updateOne,
//     deleteOne,
//   }

// }

