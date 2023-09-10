/**
 * The functions responsible for handling the course type.
 * @module course_logic
 */

 module.exports = (db) => {
  const Op = db.Sequelize.Op;
  /**
   * Find a course with the sequelize "findOne" function.
   * @param {Object} sequelizeSearch - {{where: Object, include: Object}} [Sequelize fineOne Docs](https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-)
   * @returns {course}
   * @example 
   *  await courseLogic.findOne({
   *    where:{
   *      coursename: "cool"
   *    }
   *  })
   */
  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const course = await db.course.findOne(sequelizeSearch);

      resolve(course);
    })
  }


  /**
   * Find a course by Id.
   * @param {Object} param1 - {id: 1}
   * @returns {course}
   * @example 
   *  await courseLogic.getOneById({
   *    id: 1
   *  })
   */
  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const course = await db.course.findOne({ where: { id, isDeleted: false } });

      resolve(course);
    })
  }

  /**
   * Find many courses with pagination.
   * @param {searchParam} firstParam - {id, page, pageSize}
   * @returns {pagination<course>}
   * @example 
   *  await courseLogic.getManyWithPagination({
   *    q: "search",
   *    page: 2,
   *    pageSize:2
   *  })
   */
  const getManyWithPagination = ({ q, page, pageSize }) => {
    return new Promise(async (resolve, reject) => {

      page = page ? page - 1 : 0;
      pageSize = pageSize || 10;

      if (page < 0) {
        return new Error("Please start the page at 1.");
      }
      if (pageSize < 0 || pageSize >= 100) {
        return new Error("Please keep pageSize inbetween 1 - 100.");
      }

      const offset = page * pageSize;
      const limit = pageSize;

      let search = {
        where: {
          isDeleted: false,
        },
      };

      if (q) {
        search = {
          where: {
            coursename: {
              [Op.like]: "%" + q + "%",
            },
            isDeleted: false,
          },
        };
      }

      search.offset = offset;
      search.limit = limit;

      const courses = await db.course.findAndCountAll(search);
      courses.page = page + 1;
      courses.pageSize = pageSize;
      courses.pageCount = Math.ceil(courses.count / courses.pageSize);


      resolve(courses)
    })
  }

  /**
   * Save a course. This includes the profile, permissions, and roles
   * @param {course} courseObject - { coursename, email, password, profile, permissionMany, roleMany, overridePassword } It takes all the "course" properties except id.
   * @returns {course} - It returns the same object but with an id.
   * @example 
   *  await courseLogic.addOne({
   *    coursename: "coursename",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *    permissionMany: [{id:1}, {id:2}],
   *    roleMany: [{id:2}],
   *    // to override the password with an encrypted password
   *    overridePassword,
   *  })
   */
  const addOne = ({ name, description }) => {
    return new Promise(async (resolve, reject) => {

      const course = await db.course.create({name, description});

      resolve(course);
    })
  }

  /**
   * Save many course. This includes the profile, permissions, and roles
   * @param {Array<usesr>} ArrayOfCourses - { coursename, email, password, profile, permissionMany, roleMany, overridePassword } It takes all the "course" properties except id.
   * @returns {boolean} - The result is true or false for the completion of the saves.
   * @example 
   *  await courseLogic.addMany([{
   *    coursename: "coursename",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *    permissionMany: [{id:1}, {id:2}],
   *    roleMany: [{id:2}]
   *    // to override the password with an encrypted password
   *    overridePassword,
   *  }])
   */
  const addMany = (courseArray) => {
    return new Promise(async (resolve, reject) => {
      const results = []
      for (var i = 0; i < courseArray.length; i++) {
        const course = courseArray[i];

        results.push(await addOne(course))
      }
      resolve(results)
    })
  }

  /**
   * Update a course. This does not include permissions and roles.
   * @param {course} courseObject - { id, coursename, email, password, profile, permissionMany, roleMany } It takes all the "course" properties. Id is required.
   * @returns {course} 
   * @example 
   *  await courseLogic.updateOne([{
   *    id: 1000000000,
   *    coursename: "coursename",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *  }])
   */
  const updateOne = ({ id, name, description }) => {
    return new Promise(async (resolve, reject) => {

      let course = {};

      let where = {id, isDeleted: false}

        savedCourse = await db.course.update(
          {
            name, 
            description
          },
          {
            where,
            returning: true,
          }
        );

        course = savedCourse[0] !== 0 ? savedCourse[1][0].dataValues : null
      

      resolve(course)
    })
  }

  /**
   * Delete a course. A soft delete from the column "is_deleted" becoming true.
   * @param {Object} param1 - { id } Id is required.
   * @returns {course} 
   * @example 
   *  await courseLogic.deleteOne({
   *    id: 1000000000,
   *  })
   */
  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const course = await db.course.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(course[0] !== 0 ? course[1][0].dataValues : null)
    })
  }


  return {
    findOne,
    getOneById,
    getManyWithPagination,
    addOne,
    addMany,
    updateOne,
    deleteOne,
  }
}