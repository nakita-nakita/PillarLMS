import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getMyVote from "./scripts/discussionVoteSql/getMyVote.script"
import getTotalVote from "./scripts/discussionVoteSql/getTotalVote.script"
import setMyVote from "./scripts/discussionVoteSql/setMyVote.script"

export default function makeBackendSiteDesignerDiscussionCommentVoteSql(d: d_sub) {

  return {
    getMyVote: getMyVote(d),
    getTotalVote: getTotalVote(d),
    setMyVote: setMyVote(d),
  }
}

// /**
//  * The functions responsible for handling the discussionComment type.
//  * @module discussionComment_logic
//  */

// const { errorHandler } = require("../../../../../utils/errorHandling/sequelize.errorHandler");

// module.exports = (db) => {
//   const Op = db.Sequelize.Op;

//   const convertNumberToVote = (numberVote) => {
//     switch (numberVote) {
//       case 1:
//         return "UP";
//       case -1:
//         return "DOWN";
//       case 0:
//         return "NONE";
//       default:
//         return "NONE";
//     }
//   }

//   const convertVoteToNumber = (vote) => {
//     switch (vote) {
//       case "UP":
//         return 1;
//       case "DOWN":
//         return -1;
//       case "NONE":
//         return 0;
//       default:
//         return 0;
//     }
//   }

//   const getTotalVoteForDiscussion = ({ discussionId }) => {
//     return new Promise(async (resolve) => {
//       //become a sum
//       const data = await db.backendSiteDesigner_discussionVote.findOne({
//         attributes: [
//           [sequelize.fn('sum', sequelize.col('vote')), 'voteTotal']
//         ],
//         where: {
//           discussionId,
//           isDeleted: false
//         },
//         raw: true
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: data.voteTotal
//       })
//     })
//   }

//   const getMyVoteForDiscussion = ({ discussionId, userId }) => {
//     return new Promise(async (resolve) => {
//       const data = await db.backendSiteDesigner_discussionVote.findOne({
//         where: {
//           discussionId,
//           userId,
//           isDeleted: false
//         },
//         raw: true
//       }).catch(errorHandler)

//       resolve({
//         success: true,
//         data: convertNumberToVote(data?.vote)
//       })
//     })
//   }

//   const setMyVoteForDiscussion = ({ discussionId, userId, vote }) => {
//     return new Promise(async (resolve) => {
//       let data;
//       const voteNumber = convertVoteToNumber(vote);

//       const record = await db.backendSiteDesigner_discussionVote.findOne({
//         where: {
//           discussionId,
//           userId,
//           isDeleted: false
//         },
//         raw: true
//       }).catch(errorHandler)


//       if (record) {
//         data = await db.backendSiteDesigner_discussionVote.update(
//           { vote: voteNumber },
//           {
//             where: {
//               discussionId,
//               userId,
//               isDeleted: false
//             },
//             returning: true,
//             raw: true,
//           }
//         ).catch(errorHandler)

//         data = data[0] !== 0 ? data[1][0] : null
//       } else {

//         data = db.backendSiteDesigner_discussionVote.build({
//           discussionId,
//           userId,
//           vote: voteNumber
//         })

//         await data.save().catch(errorHandler)
//       }

//       resolve({
//         success: true,
//         data: convertNumberToVote(data?.vote)
//       })
//     })
//   }

//   return {
//     getTotalVoteForDiscussion,
//     getMyVoteForDiscussion,
//     setMyVoteForDiscussion,
//   }
// }


