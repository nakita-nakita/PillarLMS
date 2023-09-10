const bcrypt = require("bcryptjs");

/**
 * The functions responsible for handling the settingPassword type.
 * @module settingPassword_logic
 */


module.exports = (db) => {
    /**
     * Retrieves the password settings. 
     * @returns {settingPassword}
     * @example 
     *  await settingPasswordLogic.getOne()
     * 
     */
    const getOne = () => {
        return new Promise(async (resolve, reject) => {

            const settingPassword = await db.settingPassword.findOne();

            resolve(settingPassword)
        })
    }

    /**
     * Updates the password settings
     * @param {Object} settingPasswordObject - { passwordLength, shouldHaveUppercaseLetter, shouldHaveLowercaseLetter, shouldHaveNumber, shouldHaveSymbol }
     * @returns {settingPassword}
     * @example 
     *  await settingPasswordLogic.updateOne({
     *      passwordLength, 
     *      shouldHaveUppercaseLetter, 
     *      shouldHaveLowercaseLetter, 
     *      shouldHaveNumber, 
     *      shouldHaveSymbol }
     *  })
     * 
     */

    const updateOne = ({ passwordLength, shouldHaveUppercaseLetter, shouldHaveLowercaseLetter, shouldHaveNumber, shouldHaveSymbol }) => {
        return new Promise(async (resolve, reject) => {

            const settingPassword = await db.settingPassword.findOne();

            await settingPassword.update({
                passwordLength,
                shouldHaveUppercaseLetter,
                shouldHaveLowercaseLetter,
                shouldHaveNumber,
                shouldHaveSymbol,
            })

            resolve(settingPassword)
        })
    }

    return {
        getOne,
        updateOne,
    }
}