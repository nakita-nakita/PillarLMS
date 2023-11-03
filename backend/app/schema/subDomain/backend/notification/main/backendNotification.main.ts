import makeBackendNotificationValidation from "../preMain/backendNotification.validation"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getFirstByCount from "./scripts/main/getFirstByCount.script"
import getUnseenNotificationCount from "./scripts/main/getUnseenNotificationCount.script"
import hasBeenClick from "./scripts/main/hasBeenClick.script"
import hasBeenSeen from "./scripts/main/hasBeenSeen.script"
import updateOne from "./scripts/main/updateOne.script"
import hasBeenSeenById from "./scripts/main/hasBeenSeenById.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"



export default function makeBackendNotificationMain(d: dependencies) {
  const validators = makeBackendNotificationValidation(d)

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getFirstByCount: getFirstByCount(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getUnseenNotificationCount:getUnseenNotificationCount(d),
    hasBeenClick: hasBeenClick(d),
    hasBeenSeen: hasBeenSeen(d),
    hasBeenSeenById: hasBeenSeenById(d),
    updateOne: updateOne(d),

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