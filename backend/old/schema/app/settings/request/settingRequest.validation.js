

/**
 * The functions responsible for validating the settingRequest.
 * @module settingRequest_validation
 */

module.exports = (db) => {

  /**
   * Will the settingRequest allow a sign up. 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await settingRequestValidation.canUserSignUp()
   * 
   */
  const canUserSignUp = () => {
    return new Promise(async (resolve, reject) => {
      const settingRequest = await db.settingRequest.findOne();

      if (settingRequest.type === "MANUAL") {
        return reject({ result: false, message: "User signup by invite only." });
      }

      if (
        settingRequest.type === "REQUEST" &&
        requestPassword !== settingRequest.password
      ) {
        return reject({ result: false, message:"Request Password doesn't match required password."});
      }

      return resolve({result: true })
    })
  }

  return {
    canUserSignUp,
  }

}