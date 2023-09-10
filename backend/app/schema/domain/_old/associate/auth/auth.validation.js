const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../../../config/auth.config");

/**
 * The functions responsible for validating the authentication.
 * @module auth_validation
 */


module.exports = (db) => {
  const Op = db.Sequelize.Op;

  /**
   * Check the settings password policy against a new password.
   * @param {string} password - A string named password. 
   * @returns {Object} - { result: boolean, data: Array<errorMessages> }
   * @example 
   *  await authLogic.isPasswordValid("Password")
   */
  const isPasswordValid = (password) => {
    return new Promise(async (resolve, reject) => {
      const passwordRules = await db.settingPassword.findOne();
      const errorArray = [];

      if (password.length < passwordRules.passwordLength) {
        errorArray.push(
          `Password but be a minimum of length of ${passwordRules.passwordLength}.`
        );
      }

      if (passwordRules.shouldHaveUppercaseLetter && !/[A-Z]/.test(password)) {
        errorArray.push(`One uppercase character needed.`);
      }

      if (passwordRules.shouldHaveLowercaseLetter && !/[a-z]/.test(password)) {
        errorArray.push(`One lowercase character needed.`);
      }

      if (passwordRules.shouldHaveLowercaseLetter && !/\d/.test(password)) {
        errorArray.push(`One number needed.`);
      }

      if (
        passwordRules.shouldHaveSymbol &&
        !/[|\\/~^:,;?!&%$@*+]/.test(password)
      ) {
        errorArray.push(`One symbol needed.`);
      }

      if (errorArray.length) {
        errorArray.unshift("Password has error(s).")
      }

      resolve(errorArray.length === 0 ? { result: true } : { result: false, data: errorArray });
    });
  };

  /**
   * Compare two passwords. Password1 is for the normal string. Password2 is for the already encrypted string.
   * @param {Object} Object - { password1, password2 } 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await authLogic.isPasswordCorrect({
   *    password1: "normal string",
   *    password2: "encrypted string",
   * })
   */
  const isPasswordCorrect = ({ password1, password2 }) => {
    return new Promise((resolve, reject) => {
      resolve({ result: bcrypt.compareSync(password1, password2) })
    })
  }

  /**
   * Checks the format of the email.
   * @param {string} email - "example@example.com" 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await authLogic.isEmailValid("example@example.com")
   */
  const isEmailValid = (email) => {
    return new Promise(async (resolve, reject) => {

      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const solution = re.test(String(email).toLowerCase())

      resolve({ result: solution });
    });
  };

  /**
   * Is another user using that email? Return true to use email.
   * @param {string} email - "example@example.com" 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await authLogic.isEmailUnique("example@example.com")
   */
  const isEmailUnique = (email) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.findOne({ where: { email: email } })

      resolve({ result: user === null })

    })
  }

  /**
   * Is another user using that username? Return true to use username.
   * @param {string} email - "example@example.com" 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await authLogic.isUsernameUnique("username")
   */
  const isUsernameUnique = (username) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.findOne({ where: { username: username } })

      resolve({ result: user === null })
    })
  }

  /**
   * Is the user table empty? Returns a true if a user row exist in the user table. 
   * @returns {boolean}
   * @example 
   *  await authLogic.doesAUserExist()
   */
  const doesAUserExists = () => {
    return new Promise(async (resolve, reject) => {
      const doesAUserExist = await db.user.findOne()

      resolve({ result: doesAUserExist !== null })
    })
  }

  /**
   * Checks the settings to grant user permission to sign up.
   * @returns {Object} - { result: true }
   * @example 
   *  await authLogic.canUserSignUp()
   */
  const canUserSignUp = () => {
    return new Promise(async (resolve, reject) => {

      const settingRequest = await db.settingRequest.findOne();

      switch (settingRequest.type) {
        case "MANUAL":

          return resolve({ result: false, message: "User signup by invite only." });
        case "REQUEST_NO_PASSWORD":
          return resolve({ result: false, message: "Please use User Request." });
          break;
        case "REQUEST":

          return resolve({ result: false, message: "Please use User Request." });
          break;
      }

      resolve({ result: true })
    })
  }

  return {
    doesAUserExists,
    isPasswordValid,
    isPasswordCorrect,
    isEmailValid,
    isEmailUnique,
    isUsernameUnique,
    doesAUserExists,
    canUserSignUp,
  }
}
