import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import areNamesTaken from "./scripts/validation/areNamesTaken.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isNameTaken from "./scripts/validation/isNameTaken.script"

export default function makeBackendPermissionValidation(d: d_sub) {
  return {
    areIdsValid: areIdsValid(d),
    areNamesTaken: areNamesTaken(d),
    isIdValid: isIdValid(d),
    isNameTaken: isNameTaken(d),
  }
}

// module.exports = ({ subDomain, errorHandler }) => {

//   const isIdValid = async ({ id }) => {

//     const checkExistingPermission = await subDomain.backend_permission.findOne({
//       where: {
//         id,
//       },
//     }).catch(errorHandler)

//     return {
//       success: true,
//       result: checkExistingPermission !== null
//     }
//   }

//   const areIdsValid = ({ idArray }) => {
//     return new Promise(async (resolve, reject) => {

//       const selectedPermissions = await subDomain.backend_permission.findAndCountAll({
//         where: {
//           id: {
//             [subDomain.Sequelize.Op.in]: idArray
//           }
//         }
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         result: idArray.length === selectedPermissions.count
//       })
//     })
//   }

//   const isNameTaken = async ({ name }) => {

//     const checkExistingPermission = await subDomain.backend_permission.findOne({
//       where: {
//         name: name
//       },
//     }).catch(errorHandler)

//     return {
//       success: true,
//       result: checkExistingPermission !== null
//     }
//     // })
//   }

//   return {
//     isIdValid,
//     areIdsValid,
//     isNameTaken,
//   }
// }
