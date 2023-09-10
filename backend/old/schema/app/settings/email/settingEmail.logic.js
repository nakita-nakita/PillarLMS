const bcrypt = require("bcryptjs");

/**
 * The functions responsible for handling the settingEmail type.
 * @module settingEmail_logic
 */


module.exports = (db) => {
  /**
   * Retrieves the email settings. 
   * @returns {settingEmail}
   * @example 
   *  await settingEmailLogic.getOne()
   * 
   */
  const getOne = () => {
    return new Promise(async (resolve, reject) => {

      const settingEmail = await db.settingEmail.findOne();

      resolve(settingEmail)
    })
  }

  /**
   * Updates the email settings
   * @param {Object} settingEmailObject - { emailVerificationSubject, emailVerificationMessage, passwordResetSubject, passwordResetMessage, resetPasswordEmailSubject, resetPasswordEmailMessage, inviteUserSubject, inviteUserMessage }
   * @returns {settingEmail}
   * @example 
   *  await settingEmailLogic.updateOne({
   *    emailVerificationSubject,
   *    emailVerificationMessage,
   *    passwordResetSubject,
   *    passwordResetMessage,
   *    resetPasswordEmailSubject,
   *    resetPasswordEmailMessage,
   *    inviteUserSubject,
   *    inviteUserMessage
   *  })
   * 
   */

  const updateOne = (obj) => {
    return new Promise(async (resolve, reject) => {

      const settingEmail = await db.settingEmail.findOne();

      settingEmailUpdated = (await db.settingEmail.update(
        obj,
        {
          where: {
            id: settingEmail.id
          },
          returning: true
        }))[1][0].dataValues;



      // await settingEmail.update(obj)

      resolve(settingEmailUpdated)
    })
  }

  return {
    getOne,
    updateOne,
  }
}