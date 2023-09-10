const db = require('../../../models');
const makeUserLogic = require("./user.logic")

const userLogic = makeUserLogic(db);

const getOneById = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    
    const user = await userLogic.getOneById({
      id
    })

    resolve(user)
  })
}

module.exports = {
  getOneById
}