import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/discussion/addOne.script"
import deleteOne from "./scripts/discussion/deleteOne.script"
import getManyWithPagination from "./scripts/discussion/getManyWithPagination.script"
import getOneById from "./scripts/discussion/getOneById.script"
import updateOne from "./scripts/discussion/updateOne.script"

export default function makeBackendSiteDesignerDiscussionMain(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}


// const db = require("../../../models")
// const makeUserLogic = require('../../user/user/user.logic');
// const makeCourseDiscussionLogic = require("../preMain/backendSiteDesigner_discussion.sql")
// const makeCourseDiscussionVoteLogic = require("../courseDiscussionVote.logic")
// const makeCourseDiscussionCommentLogic = require("../preMain/backendSiteDesigner_discussionComment.sql")
// // const makeCourseDiscussionCommentVoteLogic = require("./courseDiscussionCommentVote.logic")

// const userLogic = makeUserLogic(db)
// const courseDiscussionLogic = makeCourseDiscussionLogic(db)
// const courseDiscussionVoteLogic = makeCourseDiscussionVoteLogic(db)
// const courseDiscussionCommentLogic = makeCourseDiscussionCommentLogic(db)
// // const courseDiscussionCommentVoteLogic = makeCourseDiscussionCommentVoteLogic(db)

// const getDiscussions = ({ courseId, type, pageSize, page }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionLogic.getManyWithPagination({ courseId, type, pageSize, page })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const getDiscussion = ({ id }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionLogic.getOneById({ id })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }


// const addDiscussion = ({ userId, courseId, title, post }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionLogic.addOne({ userId, courseId, title, post })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const updateDiscussion = ({ id, title, post }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionLogic.updateOne({ id, title, post })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const deleteDiscussion = ({ id }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionLogic.deleteOne({ id })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const getTotalVoteForDiscussion = ({ courseDiscussionId }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionVoteLogic.getTotalVoteForDiscussion({ courseDiscussionId })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const getMyVoteForDiscussion = ({ courseDiscussionId, userId }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionVoteLogic.getMyVoteForDiscussion({ courseDiscussionId, userId })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const setMyVoteForDiscussion = ({ courseDiscussionId, userId, vote }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionVoteLogic.setMyVoteForDiscussion({ courseDiscussionId, userId, vote })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// //comments below

// const getDiscussionComments = ({ courseDiscussionId, pageSize, page }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionCommentLogic.getManyWithPagination({ courseDiscussionId, pageSize, page })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const addDiscussionComment = ({ userId, post, courseDiscussionId }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionCommentLogic.addOne({ userId, post, courseDiscussionId })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const updateDiscussionComment = ({ id, post }) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionCommentLogic.updateOne({ id, post })

//     resolve({
//       success: true,
//       data
//     })
//   })
// }

// const deleteDiscussionComment = ({id}) => {
//   return new Promise(async (resolve) => {
//     const data = await courseDiscussionCommentLogic.deleteOne({ id })

//     resolve({
//       success: true,
//       data
//     })
//   })

// }




// module.exports = {
//   getDiscussions,
//   getDiscussion,
//   addDiscussion,
//   updateDiscussion,
//   deleteDiscussion,
//   getTotalVoteForDiscussion,
//   getMyVoteForDiscussion,
//   setMyVoteForDiscussion,

//   getDiscussionComments,
//   addDiscussionComment,
//   updateDiscussionComment,
//   deleteDiscussionComment,
// }