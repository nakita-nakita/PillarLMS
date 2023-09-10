/**
 * The functions responsible for validating the courseentication.
 * @module course_validation
 */


module.exports = (db) => {
  const Op = db.Sequelize.Op;

  /**
   * Is another course using that name?
   * @param {string} name - "Art Course" 
   * @returns {Object} - { result: boolean }
   * @example 
   *  await courseLogic.isNameUnique("username")
   */
  const isNameUnique = (name) => {
    return new Promise(async (resolve) => {
      const course = await db.course.findOne({ where: { name } })

      resolve({ result: course === null })
    })
  }

  return {
    isNameUnique,
  }
}
