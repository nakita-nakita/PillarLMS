const config = require("../../../config/auth.config");
var jwt = require("jsonwebtoken");

/**
 * The functions responsible for handling the permission type.
 * @module auth_logic
 */

module.exports = (db) => {
  /**
   * How to get the JWT token for authorization in this application.
   * @param {Object} userId - {id} 
   * @returns {Object} - { token, userId }
   * @example 
   *  await authLogic.signToken({
   *    userId
   *  })
   */
  const signToken = ({ userId, isCreator = false, isAdmin = false }) => {
    return new Promise(async (resolve, reject) => {

      var token = jwt.sign({ id: userId }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      resolve({ token, userId, isCreator, isAdmin });
    })
  }

  /**
   * The first user becomes an admin. This role is granted all access.
   * @param {Object} userIdObject - {userId} 
   * @returns {Object} - { result: true }
   * @example 
   *  await authLogic.createFirst({
   *    userId,
   *  })
   */
  const createFirstUser = ({ userId }) => {
    return new Promise(async (resolve, reject) => {

      const rootRole = await db.role.findOne({
        where: {
          name: "admin"
        }
      });

      const firstUserRole = db.userManyRole.build({
        userId,
        roleId: rootRole.id,
      });

      await firstUserRole.save();

      resolve({ result: true })
    })
  }


  /**
   * Return { userId } or { userId : null }
   * @param {String} token  
   * @returns {Object} - { userId: 1 }
   * @example 
   *  await authLogic.getuserIdFromToken({
   *    token,
   *  })
   */
  const getuserIdFromToken = ({ token }) => {
    return new Promise(async (resolve, reject) => {

      try {
        const currentToken = await jwt.verify(token, config.secret);
        if (currentToken) {

          resolve({ userId: currentToken.id })
        }

      } catch (error) {
        resolve({ userId: null })
      }


    })
  }



  return {
    signToken,
    createFirstUser,
    getuserIdFromToken,
  }
}