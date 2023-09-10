import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/main/getOne.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendSiteDesignerSettingMain(dbSub: d_sub) {

  return {
    getOne: getOne(dbSub),
    updateOne: updateOne(dbSub),
  }
}


// const db = require("../../../models")
// const makeUserLogic = require('../../user/user/user.logic');
// const makeCourseLogic = require("../course/course.logic")
// const makeCourseSettingsLogic = require("./courseSettings.logic")
// const makeCourseSettingsReadAccessLogic = require("./courseSettingsReadAccess.logic")
// const makeCourseSettingsSettingAccessLogic = require("./courseSettingsSettingAccess.logic")
// const makeCourseSettingsUpdateAccessLogic = require("./courseSettingsUpdateAccess.logic")

// const userLogic = makeUserLogic(db)
// const courseLogic = makeCourseLogic(db)
// const courseSettingsLogic = makeCourseSettingsLogic(db)
// const courseSettingsReadAccessLogic = makeCourseSettingsReadAccessLogic(db)
// const courseSettingsSettingAccessLogic = makeCourseSettingsSettingAccessLogic(db)
// const courseSettingsUpdateAccessLogic = makeCourseSettingsUpdateAccessLogic(db)


// const getCourseSettingsPage = ({ id }) => {
//   return new Promise(async (resolve) => {
//     const course = await courseLogic.getOneById({ id })
//     const courseSettings = await courseSettingsLogic.getOneByCourseId({ courseId: id })

//     const readAccessArray = await courseSettingsReadAccessLogic.findMany({ where: { courseId: id, isDeleted: false } })
//     const settingAccessArray = await courseSettingsSettingAccessLogic.findMany({ where: { courseId: id, isDeleted: false } })
//     const updateAccessArray = await courseSettingsUpdateAccessLogic.findMany({ where: { courseId: id, isDeleted: false } })


//     const courseSettingsData = {
//       courseName: course.name,
//       courseSettings: courseSettings.get({ plain: true }),
//       readAccess: readAccessArray.map(ra => ({
//         value: ra.userId,
//         label: ra['user.username']
//       })),
//       settingAccess: settingAccessArray.map(ra => ({
//         value: ra.userId,
//         label: ra['user.username']
//       })),
//       updateAccess: updateAccessArray.map(ra => ({
//         value: ra.userId,
//         label: ra['user.username']
//       })),
//     }

//     resolve({
//       success: true,
//       data: courseSettingsData,
//     })
//   })
// }

// const setReadAccess = ({ id, readAccessArray }) => {
//   return new Promise(async (resolve) => {

//     const readAccessReturn = await courseSettingsReadAccessLogic.findMany({ where: { courseId: id, isDeleted: false } });


//     let readAccessDeletions = readAccessReturn.filter((ra) => {
//       for (let i = 0; i < readAccessArray.length; i++) {
//         const element = readAccessArray[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: true
//     }));


//     let readAccessAdditions = readAccessArray.filter((ra) => {
//       for (let i = 0; i < readAccessReturn.length; i++) {
//         const element = readAccessReturn[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: false
//     }));

//     const bulkSavedArray = [...readAccessDeletions, ...readAccessAdditions];

//     if (bulkSavedArray.length > 0) {
//       await courseSettingsReadAccessLogic.upsertMany(bulkSavedArray)
//     }

//     resolve();
//   })
// }

// const setSettingsAccess = ({ id, settingAccessArray }) => {
//   return new Promise(async (resolve) => {

//     const settingAccessReturn = await courseSettingsSettingAccessLogic.findMany({ where: { courseId: id, isDeleted: false } });

//     // Update settings access
//     let settingsAccessDeletions = settingAccessReturn.filter((ra) => {
//       for (let i = 0; i < settingAccessArray.length; i++) {
//         const element = settingAccessArray[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: true
//     }));


//     let settingsAccessAdditions = settingAccessArray.filter((ra) => {
//       for (let i = 0; i < settingAccessReturn.length; i++) {
//         const element = settingAccessReturn[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: false
//     }));

//     const bulkSavedArray = [...settingsAccessDeletions, ...settingsAccessAdditions];

//     if (bulkSavedArray.length > 0) {
//       await courseSettingsSettingAccessLogic.upsertMany(bulkSavedArray)
//     }

//     resolve();
//   })
// }

// const setUpdateAccess = ({ id, updateAccessArray }) => {
//   return new Promise(async (resolve) => {

//     const updateAccessReturn = await courseSettingsUpdateAccessLogic.findMany({ where: { courseId: id, isDeleted: false } })

//     // Update update access
//     let updateAccessDeletions = updateAccessReturn.filter((ra) => {
//       for (let i = 0; i < updateAccessArray.length; i++) {
//         const element = updateAccessArray[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: true
//     }));


//     let updateAccessAdditions = updateAccessArray.filter((ra) => {
//       for (let i = 0; i < updateAccessReturn.length; i++) {
//         const element = updateAccessReturn[i];

//         if (element.userId == ra.userId) {
//           return false
//         }

//       }
//       return true;
//     }).map(ra => ({
//       courseId: ra.courseId,
//       userId: ra.userId,
//       isDeleted: false
//     }));

//     const bulkSavedArray = [...updateAccessDeletions, ...updateAccessAdditions];

//     if (bulkSavedArray.length > 0) {
//       await courseSettingsUpdateAccessLogic.upsertMany(bulkSavedArray)
//     }

//     resolve();

//   })
// }

// const setCourseSettingsPage = ({ id, courseSettings, readAccessArray, settingAccessArray, updateAccessArray }) => {
//   return new Promise(async (resolve) => {

//     await courseSettingsLogic.updateOneByCourseId({ ...courseSettings, courseId: id })

//     if (readAccessArray) {
//       await setReadAccess({ id, readAccessArray });
//     }

//     if (settingAccessArray) {
//       await setSettingsAccess({ id, settingAccessArray });
//     }

//     if (updateAccessArray) {
//       await setUpdateAccess({ id, updateAccessArray })
//     }

//     resolve({ success: true })
//   })
// }

// const getReadAccessUsers = () => {
//   return new Promise(async (resolve) => {
//     const users = await userLogic.getManyWithPagination({});

//     resolve({ success: true, data: users })
//   });
// }

// const getUpdateAccessUsers = () => {
//   return new Promise(async (resolve) => {
//     const users = await userLogic.getManyWithPagination({});

//     resolve({ success: true, data: users })
//   });
// }

// const getSettingsAccessUsers = () => {
//   return new Promise(async (resolve) => {
//     const users = await userLogic.getManyWithPagination({});

//     resolve({ success: true, data: users })
//   });
// }

// // getReadAccessUsers(courseId: ID!) : [userAccessType]
// // getUpdateAccessUsers(courseId: ID!) : [userAccessType]
// // getSettingsAccessUsers(courseId: ID!) : [userAccessType]


// module.exports = {
//   getCourseSettingsPage,
//   setCourseSettingsPage,
//   setReadAccess,
//   setSettingsAccess,
//   setUpdateAccess,

//   getReadAccessUsers,
//   getUpdateAccessUsers,
//   getSettingsAccessUsers,
// }