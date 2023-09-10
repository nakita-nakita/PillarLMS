const bcrypt = require("bcryptjs");

/**
 * The functions responsible for handling the settingRequest type.
 * @module settingRequest_logic
 */


module.exports = (db) => {
  /**
   * Retrieve the setting with sequelize "findOne" function.
   * @returns {settingRequest}
   * @example 
   *  await settingRequestLogic.getOne()
   * 
   */
  const getOne = () => {
    return new Promise(async (resolve, reject) => {

      const settingRequest = await db.settingRequest.findOne();

      resolve(settingRequest)
    })
  }

  /**
   * Retrieve the setting with sequelize "updateOne" function.
   * @param {Object} settingRequestObject - {type, password} 
   * @returns {settingRequest}
   * @example 
   *  await settingRequestLogic.updateOne({
   *      type,
   *      password,
   *    })
   * 
   */

  const updateOne = ({ type, password }) => {
    return new Promise(async (resolve, reject) => {

      const settingRequest = await db.settingRequest.findOne();

      await settingRequest.update({
        type, 
        password,
      })

      resolve(settingRequest)
    })
  }

  return {
    getOne,
    updateOne,
  }
}