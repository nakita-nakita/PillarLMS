const bcrypt = require("bcryptjs");

/**
 * The functions responsible for handling the settingGeneral type.
 * @module settingGeneral_logic
 */


module.exports = (db) => {
    /**
     * Retrieves the general settings. 
     * @returns {settingGeneral}
     * @example 
     *  await settingGeneralLogic.getOne()
     * 
     */
    const getOne = () => {
        return new Promise(async (resolve, reject) => {

            const settingGeneral = await db.settingGeneral.findOne();

            resolve(settingGeneral)
        })
    }

    /**
     * Updates the general settings
     * @param {Object} settingGeneralObject - { generalLength, shouldHaveUppercaseLetter, shouldHaveLowercaseLetter, shouldHaveNumber, shouldHaveSymbol }
     * @returns {settingGeneral}
     * @example 
     *  await settingGeneralLogic.updateOne({
     *      companyName,
     *      address1,
     *      address2,
     *      address3,
     *      address4,
     *      city,
     *      country,
     *      postal,
     *      phone,
     *  })
     * 
     */

    const updateOne = (args) => {
        return new Promise(async (resolve, reject) => {
            const settingGeneral = await db.settingGeneral.findOne();
            await settingGeneral.update(args)
            resolve(settingGeneral)
        })
    }

    return {
        getOne,
        updateOne,
    }
}