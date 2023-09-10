import { d_domain } from "../../../../utils/types/dependencyInjection.types"
import signinToken from "./scripts/func/signToken.script"
import getDataFromToken from "./scripts/func/getDataFromToken.script"

export default function makeFoundationAuthFunc(d: d_domain) {

  return {
    signinToken: signinToken(d),
    getDataFromToken: getDataFromToken(d),
  }
}
// const config = require("../../../config/auth.config");
// var jwt = require("jsonwebtoken");

// /**
//  * The functions responsible for handling the permission type.
//  * @module auth_logic
//  */

// module.exports = (db) => {
//   /**
//    * How to get the JWT token for authorization in this application.
//    * @param {Object} userId - {id} 
//    * @returns {Object} - { token, userId }
//    * @example 
//    *  await authLogic.signToken({
//    *    userId
//    *  })
//    */
//   const signToken = ({ userId, subDomainId, }) => {
//     return new Promise(async (resolve) => {
//       let jwtData = { userId, }

//       if (subDomainId) {
//         jwtData = {
//           ...jwtData,
//           subDomainId,
//         }
//       }

//       var token = jwt.sign(jwtData, config.secret, {
//         expiresIn: 86400, // 24 hours
//       });

//       resolve({
//         success: true,
//         data: token,
//       });
//     })
//   }

//   // /**
//   //  * The first user becomes an admin. This role is granted all access.
//   //  * @param {Object} userIdObject - {userId} 
//   //  * @returns {Object} - { result: true }
//   //  * @example 
//   //  *  await authLogic.createFirst({
//   //  *    userId,
//   //  *  })
//   //  */
//   // const createFirstUser = ({ userId }) => {
//   //   return new Promise(async (resolve, reject) => {

//   //     const rootRole = await db.role.findOne({
//   //       where: {
//   //         name: "admin"
//   //       }
//   //     });

//   //     const firstUserRole = db.userManyRole.build({
//   //       userId,
//   //       roleId: rootRole.id,
//   //     });

//   //     await firstUserRole.save();

//   //     resolve({ result: true })
//   //   })
//   // }


//   /**
//    * Return { userId } or { userId : null }
//    * @param {String} token  
//    * @returns {Object} - { userId: 1 }
//    * @example 
//    *  await authLogic.getuserIdFromToken({
//    *    token,
//    *  })
//    */
//   const getDataFromToken = ({ token }) => {
//     return new Promise(async (resolve, reject) => {

//       try {
//         const currentToken = await jwt.verify(token, config.secret)
//         if (currentToken) {

//           resolve({
//             success: true,
//             data: currentToken
//           })
//         }

//       } catch (error) {
//         resolve({
//           success: false,
//           data: null
//         })
//       }
//     })
//   }



//   return {
//     signToken,
//     getDataFromToken,
//   }
// }