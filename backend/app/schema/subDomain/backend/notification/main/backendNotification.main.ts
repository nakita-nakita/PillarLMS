import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import makeBackendNotificationValidation from "../preMain/backendNotification.validation"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"


export default function makeBackendNotificationMain(d: d_sub) {
  const validators = makeBackendNotificationValidation(d)

  return {
    getOneById: getOneById(d),
    getManyWithPagination: getManyWithPagination(d),
    ...validators,
  }
}

// // const db = require("../../../models")
// const makeBackendNotificationLogic = require("../preMain/backendNotification.logic")


// module.exports = (db) => {
//   const backendNotificationLogic = makeBackendNotificationLogic(db);

//   const backendNotification = ({ id, userId }) => {
//     return new Promise(async (resolve) => {
//       const data = await backendNotificationLogic.getOneById({
//         id,
//         userId,
//       })

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }

//   const backendNotificationMany = ({ q, page, pageSize, userId }) => {
//     return new Promise(async (resolve, reject) => {
//       const data = await backendNotificationLogic.getManyWithPagination({
//         q,
//         page,
//         pageSize,
//         userId,
//       })

//       if (data.error) {
//         return reject({
//           success: false,
//           error: data.error,
//         })
//       }

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }


//   const doYouHaveNewBackendNotifications = ({ userId }) => {
//     return new Promise(async (resolve, reject) => {
//       const data = await backendNotificationLogic.doYouHaveNewNotifications({
//         userId,
//       })

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }


//   const backendNotificationHasBeenClicked = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const data = await backendNotificationLogic.hasBeenClick({
//         id,
//       })

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }


//   const backendNotificationsHaveBeenSeen = ({ userId }) => {
//     return new Promise(async (resolve, reject) => {
//       const data = await await backendNotificationLogic.hasBeenSeen({
//         userId,
//       })

//       resolve({
//         success: true,
//         data,
//       })
//     })
//   }

//   return {
//     backendNotification,
//     backendNotificationMany,
//     doYouHaveNewBackendNotifications,
//     backendNotificationHasBeenClicked,
//     backendNotificationsHaveBeenSeen,
//   }
// }