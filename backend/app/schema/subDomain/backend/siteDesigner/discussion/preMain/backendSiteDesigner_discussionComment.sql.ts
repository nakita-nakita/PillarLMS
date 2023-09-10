import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/discussionCommentSql/addOne.script"
import deleteOne from "./scripts/discussionCommentSql/deleteOne.script"
import getManyWithPagination from "./scripts/discussionCommentSql/getManyWithPagination.script"
import getOneById from "./scripts/discussionCommentSql/getOneById.script"
import updateOne from "./scripts/discussionCommentSql/updateOne.script"

export default function makeBackendSiteDesignerDiscussionCommentSql(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}

// /**
//  * The functions responsible for handling the discussionComment type.
//  * @module discussionComment_logic
//  */

// const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler")

// module.exports = (db) => {
//   const Op = db.Sequelize.Op

//   /**
//    * Find a discussionComment by Id.
//    * @param {Object} idObject - {id: 1} 
//    * @returns {discussionComment}
//    * @example 
//    *  await discussionCommentLogic.getOneById({
//    *    id
//    *  })
//    */
//   const getOneById = ({ id }) => {
//     return new Promise(async (resolve) => {
//       const discussionComment = await db.backendSiteDesigner_discussionComment.findOne({
//         where: {
//           id,
//         },
//         raw: true,
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: discussionComment
//       })
//     })
//   }

//   /**
//    * Find many discussionComments with pagination.
//    * @param {searchParam} paginationObject - {q, page, pageSize}
//    * @returns {pagination<discussionComment>}
//    * @example 
//    *  await discussionCommentLogic.getManyWithPagination({
//    *    q: "search",
//    *    page: 2,
//    *    pageSize:2
//    *  })
//    */
//   const getManyWithPagination = ({ discussionId, page, pageSize }) => {
//     return new Promise(async (resolve) => {
//       page = page ? page - 1 : 0
//       pageSize = pageSize || 10

//       if (page < 0) {
//         return resolve({
//           success: false,
//           humanMessage: "Please start the page at 1."
//         })
//       }
//       if (pageSize < 0 || pageSize >= 100) {
//         return resolve({
//           success: false,
//           humanMessage: "Please keep pageSize inbetween 1 - 100."
//         })
//       }

//       const offset = page * pageSize
//       const limit = pageSize

//       let search = {
//         where: {
//           discussionId,
//         },
//       }

//       search.offset = offset
//       search.limit = limit
//       search.raw = true

//       const discussionComments = await db.backendSiteDesigner_discussionComment.findAndCountAll(search).catch(errorHandler)
//       discussionComments.page = page + 1
//       discussionComments.pageSize = pageSize
//       discussionComments.pageCount = Math.ceil(
//         discussionComments.count / discussionComments.pageSize
//       )

//       resolve({
//         success: true,
//         data: discussionComments
//       })
//     })
//   }

//   /**
//    * Save a discussionComment.
//    * @param {discussionComment} discussionCommentObject - { name } It takes all the "discussionComment" properties except id.
//    * @returns {discussionComment} - It returns the same object but with an id.
//    * @example 
//    *  await discussionCommentLogic.addOne({
//    *    name: "name",
//    *  })
//    */
//   const addOne = (args) => {
//     return new Promise(async (resolve) => {

//       const newDiscussionComment = await db.backendSiteDesigner_discussionComment.create(args).catch(errorHandler)

//       resolve({
//         success: true,
//         data: newDiscussionComment.dataValues
//       })
//     })
//   }

//   /**
//    * Update a discussionComment.
//    * @param {discussionComment} discussionCommentObject - { id, name } It takes all the "role" properties. Id is required.
//    * @returns {discussionComment} 
//    * @example 
//    *  await discussionCommentLogic.updateOne([{
//    *    id,
//    *    name: "name",
//    *  }])
//    */
//   const updateOne = ({ id, ...args }) => {
//     return new Promise(async (resolve) => {
//       const discussionComment = await db.backendSiteDesigner_discussionComment.update(
//         {
//           ...args,
//           hasBeenEdited: true,
//         },
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       ).catch(errorHandler)

//       resolve({
//         success: true,
//         data: discussionComment[0] !== 0 ? discussionComment[1][0] : null
//       })
//     })
//   }

//   /**
//    * Delete a discussionComment. A soft delete from the column "is_deleted" becoming true.
//    * @param {Object} idObject - { id } Id is required.
//    * @returns {discussionComment} 
//    * @example 
//    *  await discussionCommentLogic.deleteOne({
//    *    id,
//    *  })
//    */
//   const deleteOne = ({ id }) => {
//     return new Promise(async (resolve) => {

//       const discussionComment = await db.backendSiteDesigner_discussionComment.destory(
//         {
//           where: {
//             id,
//           },
//           returning: true,
//           raw: true,
//         }
//       )

//       resolve({
//         success: true,
//         data: discussionComment[0] !== 0 ? discussionComment[1][0] : null
//       })
//     })
//   }


//   return {
//     getOneById,
//     getManyWithPagination,
//     addOne,
//     updateOne,
//     deleteOne,
//   }
// }


