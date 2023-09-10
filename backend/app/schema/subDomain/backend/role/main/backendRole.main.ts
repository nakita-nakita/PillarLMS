import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import makeBackendRoleValidation from "../preMain/backendRole.validation"
import addMany from "./scripts/main/addMany.script"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendRoleMain(d: d_sub) {
  const validators = makeBackendRoleValidation(d)

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    ...validators
  }
}

// const makeRoleValidation = require("../preMain/backend_role.validation")
// const makeRoleLogic = require("../preMain/backend_role.logic")
// const makeBackendPermissionEntity = require("../../permission/")

// module.exports = (db) => {
//   const backendPermissionEntity = makeBackendPermissionEntity(db)
//   const roleValidation = makeRoleValidation(db)
//   const roleLogic = makeRoleLogic(db)

//   const role = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const role = await roleLogic.getOneById({
//         id,
//       })

//       resolve({
//         success: true,
//         data: role
//       })
//     })
//   }

//   const roleMany = ({ q, page, pageSize }) => {
//     return new Promise(async (resolve, reject) => {
//       const roles = await roleLogic.getManyWithPagination({
//         q,
//         page,
//         pageSize,
//       })

//       if (roles.error) {
//         reject(roles.message)
//       }

//       resolve({
//         success: true,
//         data: roles
//       })
//     })
//   }




//   const roleAdd = ({ name, permissions, }) => {
//     return new Promise(async (resolve, reject) => {
//       //is Rolename taken
//       const isRoleNameTaken = await roleValidation.isNameTaken(name)
//       if (isRoleNameTaken.result) {
//         return reject("A role with that name already exist.");
//       }

//       //if permissions, are permissions valid?
//       if (permissions) {
//         const areIdsValid = await backendPermissionEntity.areIdsValid(permissions.map(permission => permission.id))
//         if (!areIdsValid.result) {
//           return reject("A permission id is not valid.");
//         }
//       }

//       const savedRole = await roleLogic.addOne({
//         name,
//       })

//       if (permissions) {

//         const selectedPermissions = await roleLogic.addPermissionMany(permissions)
//         //create relationship between new role and all permissions.
//         // const newPermissionManyForRole = await db.roleManyPermission.bulkCreate(args.permissions.map(permission => ({
//         //   roleId: savedRole.id,
//         //   permissionId: permission.id,
//         // })));
//         // await newUserPermissionRole.save();

//         savedRole.permissions = selectedPermissions.rows
//       }

//       resolve({
//         success: true,
//         data: savedRole
//       })
//     })
//   }


//   const roleUpdate = ({ id, name }) => {
//     return new Promise(async (resolve, reject) => {

//       //is Rolename taken
//       const isRoleNameTaken = await roleValidation.isNameTaken(name)
//       if (isRoleNameTaken.result) {
//         return reject("A role with that name already exist.");
//       }

//       const role = await roleLogic.updateOne({
//         id,
//         name,
//       })

//       resolve({
//         success: true,
//         data: role,
//       })
//     })
//   }

//   const roleDelete = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const role = await roleLogic.deleteOne({
//         id,
//       })

//       resolve({
//         success: true,
//         data: role,
//       })
//     })
//   }

//   const roleAddPermission = ({ roleId, permissionId }) => {
//     return new Promise(async (resolve, reject) => {
//       //does the permission exist
//       const isIdValid = await backendPermissionEntity.isIdValid(permissionId)
//       if (!isIdValid.result) {
//         return reject("Permission ID is not valid.")
//       }

//       const doesRoleHavePermission = await roleValidation.doesRoleHavePermission({
//         roleId,
//         permissionId,
//       })

//       if (doesRoleHavePermission.result) {
//         return reject("This role already has this permission.")
//       }

//       await roleLogic.addPermissionOne({
//         roleId,
//         permissionId,
//       })

//       resolve(await backendPermissionEntity.permission({
//         id: permissionId
//       }))

//       // resolve({
//       //   success: true,
//       //   data: permission,
//       // })
//     })
//   }


//   const roleRemovePermission = ({ roleId, permissionId, }) => {
//     return new Promise(async (resolve, reject) => {
//       await roleLogic.deletePermissionOne({
//         roleId,
//         permissionId,
//       })

//       resolve(await backendPermissionEntity.permission({
//         id: permissionId
//       }))
//     })
//   }

//   return {
//     role,
//     roleMany,
//     roleAdd,
//     roleUpdate,
//     roleDelete,
//     roleAddPermission,
//     roleRemovePermission,
//   }
// }