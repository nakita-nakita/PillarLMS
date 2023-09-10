import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
// import doYouHaveNewNotifications from "./scripts/sql/doYouHaveNewNotifications.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
// import hasBeenClick from "./scripts/validation/hasBeenClick.script"
// import hasBeenSeen from "./scripts/validation/hasBeenSeen.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendNotificationSql(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    // doYouHaveNewNotifications: doYouHaveNewNotifications(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    // hasBeenClick: hasBeenClick(d),
    // hasBeenSeen: hasBeenSeen(d),
    updateOne: updateOne(d),
  }
}



// /**
//  * (Bad Documentation because prototyping fast.) The functions responsible for handling the notification type.
//  * @module notification_logic
//  */

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;

//   /**
//    * Find a notification by Id.
//    * @param {Object} idObject - {id: 1} 
//    * @returns {notification}
//    * @example 
//    *  await notificationLogic.getOneById({
//    *    id
//    *  })
//    */
//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve, reject) => {
//       const notification = await db.notification.findOne({
//         where: {
//           id,
//         },
//         raw: true,
//       });

//       resolve(notification)
//     })
//   }

//   /**
//    * Find many notifications with pagination.
//    * @param {searchParam} paginationObject - {q, page, pageSize}
//    * @returns {pagination<notification>}
//    * @example 
//    *  await notificationLogic.getManyWithPagination({
//    *    q: "search",
//    *    page: 2,
//    *    pageSize:2
//    *  })
//    */
//   const getManyWithPagination = ({ q, page, pageSize, userId }) => {
//     return new Promise(async (resolve, reject) => {
//       page = page ? page - 1 : 0;
//       pageSize = pageSize || 10;

//       if (page < 0) {
//         reject({
//           success: false,
//           error: {
//             message: "Please start the page at 1.",
//           }
//         })
//       }
//       if (pageSize < 0 || pageSize >= 100) {
//         reject({
//           success: false,
//           error: {
//             message: "Please keep pageSize inbetween 1 - 100.",
//           }
//         })
//       }

//       const offset = page * pageSize;
//       const limit = pageSize;

//       let search = {
//         where: {
//           userId,
//         },
//       };

//       if (q) {
//         search = Object.assign(search, {
//           where: {
//             name: {
//               [Op.like]: "%" + q + "%",
//             },
//           },
//         });
//       }

//       search.offset = offset;
//       search.limit = limit;
//       search.raw = true;

//       const notifications = await db.notification.findAndCountAll(search);
//       notifications.page = page + 1;
//       notifications.pageSize = pageSize;
//       notifications.pageCount = Math.ceil(
//         notifications.count / notifications.pageSize
//       );

//       resolve(notifications)
//     })
//   }

//   /**
//    * Save a notification.
//    * @param {notification} notificationObject - { type, message, locationMessage, hasBeenSeen, hasBeenClicked, url } It takes all the "notification" properties except id.
//    * @returns {notification} - It returns the same object but with an id.
//    * @example 
//    *  await notificationLogic.addOne({
//    *    type: "SYSTEM",
//    *    message: "Test message",
//    *    locationMessage: "from course name 'blah'",
//    *    url: "test",
//    *    userId: 1
//    *  })
//    */
//   const addOne = (obj) => {
//     return new Promise(async (resolve, reject) => {

//       const newNotification = await db.notification.create(obj);

//       resolve(newNotification.dataValues)
//     })
//   }

//   /**
//    * Save many notifications.
//    * @param {Array<notifications>} ArrayOfNotifications - [{ type, message, locationMessage, hasBeenSeen, hasBeenClicked, url }] The array ojbect takes all the "notification" properties except id.
//    * @returns {boolean} - The result is true or false for the completion of the saves.
//    * @example 
//    *  await notificationLogic.addMany([{
//    *    type: "SYSTEM",
//    *    message: "Test message",
//    *    locationMessage: "from course name 'blah'",
//    *    url: "test",
//    *    userId: 1
//    *  }])
//    */
//   const addMany = ({ notificationNamesArray }) => {
//     return new Promise(async (resolve) => {

//       const newNotifications = await db.notification.bulkCreate(notificationNamesArray);

//       resolve(newNotifications)
//     })
//   }

//   // /**
//   //  * Update a notification.
//   //  * @param {notification} notificationObject - { userId, id, type, message, locationMessage, hasBeenSeen, hasBeenClicked, url } It takes all the "role" properties. Id is required.
//   //  * @returns {notification} 
//   //  * @example 
//   //  *  await notificationLogic.updateOne([{
//   //  *    id,
//   //  *    type: "SYSTEM",
//   //  *    message: "Test message",
//   //  *    locationMessage: "from course name 'blah'",
//   //  *    url: "test",
//   //  *    userId: 1,
//   //  *  }])
//   //  */
//   // const updateMany = (obj) => {
//   //   return new Promise(async (resolve, reject) => {

//   //     const notification = await db.notification.update(
//   //       { hasBeenSeen: true },
//   //       {
//   //         where: { userId, isDeleted: false },
//   //         returning: true
//   //       }
//   //     );

//   //     resolve(notification[0] !== 0 ? notification[1][0].dataValues : null)
//   //   })
//   // }

//   /**
//    * Update a notification.
//    * @param {notification} notificationObject - { id, type, message, locationMessage, hasBeenSeen, hasBeenClicked, url } It takes all the "role" properties. Id is required.
//    * @returns {notification} 
//    * @example 
//    *  await notificationLogic.updateOne([{
//    *    id,
//    *    type: "SYSTEM",
//    *    message: "Test message",
//    *    locationMessage: "from course name 'blah'",
//    *    url: "test",
//    *    userId: 1
//    *  }])
//    */
//   const updateOne = ({ id, obj }) => {
//     return new Promise(async (resolve, reject) => {

//       const notification = await db.notification.update(
//         obj,
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       );

//       resolve(notification[0] !== 0 ? notification[1][0] : null)
//     })
//   }

//   /**
//    * Delete a notification. A soft delete from the column "is_deleted" becoming true.
//    * @param {Object} idObject - { id } Id is required.
//    * @returns {notification} 
//    * @example 
//    *  await notificationLogic.deleteOne({
//    *    id,
//    *  })
//    */
//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve, reject) => {

//       const notification = await db.notification.destory(
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       );

//       resolve(notification[0] !== 0 ? notification[1][0] : null)
//     })
//   }


//   /**
//    * Update a notification.
//    * @param {notification} notificationObject - { id } Id is required.
//    * @returns {notification} 
//    * @example 
//    *  await notificationLogic.hasBeenClick([{
//    *    id,
//    *  }])
//    */
//   const hasBeenClick = ({ id }) => {
//     return new Promise(async (resolve) => {

//       const notification = await db.notification.update(
//         {
//           hasBeenClicked: true
//         },
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       );

//       resolve(notification[0] !== 0 ? notification[1][0] : null)
//     })
//   }

//   /**
//    * Update notifications
//    * @param {notification} notificationObject - { userId } User ID require for all columns to become true
//    * @returns {notification} 
//    * @example 
//    *  await notificationLogic.hasBeenSeen([{
//    *    userId,
//    *  }])
//    */
//   const hasBeenSeen = ({ userId }) => {
//     return new Promise(async (resolve) => {

//       const notification = await db.notification.update(
//         {
//           hasBeenSeen: true
//         },
//         {
//           where: {
//             userId
//           },
//           returning: true,
//           raw: true,
//         }
//       );

//       resolve(notification[0] !== 0 ? notification[1][0] : null)
//     })
//   }


//   /**
//    * Find out if the user has notifications
//    * @param {Object} idObject - {id: 1} 
//    * @returns {doesUserHaveNewNotifications: Boolean}
//    * @example 
//    *  await notificationLogic.doYouHaveNewNotifications({
//    *    id
//    *  })
//    */
//   const doYouHaveNewNotifications = ({ userId }) => {
//     return new Promise(async (resolve, reject) => {
//       const notification = await db.notification.findOne({
//         where: {
//           userId,
//           hasBeenSeen: false,
//           isDeleted: false
//         }
//       });

//       resolve({
//         success: true,
//         result: notification ? true : false,
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
//     hasBeenClick,
//     hasBeenSeen,
//     doYouHaveNewNotifications,
//   }
// }


