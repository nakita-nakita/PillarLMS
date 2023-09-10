/**
 * The functions responsible for handling the courseDiscussion type.
 * @module courseDiscussion_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  /**
   * Find a courseDiscussion by Id.
   * @param {Object} idObject - {id: 1} 
   * @returns {courseDiscussion}
   * @example 
   *  await courseDiscussionLogic.getOneById({
   *    id
   *  })
   */
  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseDiscussion = await db.courseDiscussion.findOne({
        attributes: Object.keys(db.courseDiscussion.rawAttributes).concat([
          // [db.sequelize.literal('(SELECT SUM("courseDiscussionVotes"."vote") FROM "courseDiscussionVotes" WHERE "courseDiscussionVotes"."courseDiscussionId" = "courseDiscussion"."id")'), 'voteTotal']
          [db.sequelize.fn('COALESCE', db.sequelize.literal('(SELECT SUM("courseDiscussionVotes"."vote") FROM "courseDiscussionVotes" WHERE "courseDiscussionVotes"."courseDiscussionId" = "courseDiscussion"."id")'), 0), 'voteTotal'],
          [db.sequelize.fn('COALESCE', db.sequelize.literal('(SELECT COUNT("courseDiscussionComments"."id") FROM "courseDiscussionComments" WHERE "courseDiscussionComments"."courseDiscussionId" = "courseDiscussion"."id")'), 0), 'commentsCount']

        ]),
        where:
        {
          id,
          isDeleted: false
        },
        raw: true
      });

      resolve(courseDiscussion)
    })
  }

  /**
   * Find many courseDiscussions with pagination.
   * @param {searchParam} paginationObject - {q, page, pageSize}
   * @returns {pagination<courseDiscussion>}
   * @example 
   *  await courseDiscussionLogic.getManyWithPagination({
   *    q: "search",
   *    page: 2,
   *    pageSize:2
   *  })
   */
  const getManyWithPagination = ({ courseId, type, page, pageSize }) => {
    return new Promise(async (resolve, reject) => {
      page = page ? page - 1 : 0;
      pageSize = pageSize || 10;

      if (page < 0) {
        resolve({ error: true, message: new Error("Please start the page at 1.") });
      }
      if (pageSize < 0 || pageSize >= 100) {
        resolve({ error: true, message: new Error("Please keep pageSize inbetween 1 - 100.") });
      }

      const offset = page * pageSize;
      const limit = pageSize;

      let search = {
        attributes: Object.keys(db.courseDiscussion.rawAttributes).concat([
          // [db.sequelize.literal('(SELECT SUM("courseDiscussionVotes"."vote") FROM "courseDiscussionVotes" WHERE "courseDiscussionVotes"."courseDiscussionId" = "courseDiscussion"."id")'), 'voteTotal']
          [db.sequelize.fn('COALESCE', db.sequelize.literal('(SELECT SUM("courseDiscussionVotes"."vote") FROM "courseDiscussionVotes" WHERE "courseDiscussionVotes"."courseDiscussionId" = "courseDiscussion"."id")'), 0), 'voteTotal'],
          [db.sequelize.fn('COALESCE', db.sequelize.literal('(SELECT COUNT("courseDiscussionComments"."id") FROM "courseDiscussionComments" WHERE "courseDiscussionComments"."courseDiscussionId" = "courseDiscussion"."id")'), 0), 'commentsCount']

        ]),

        // [sequelize.fn('COALESCE', sequelize.fn('SUM', (mysql.col('col_name'), mysql.col('col_2_name'))), (some other code here ...)),'alias']
        where: {
          courseId,
          isDeleted: false,
        },
        raw: true,
      };

      if (type === "NEW") {
        search.order = db.sequelize.literal('"createdAt" DESC')
      }

      if (type === "HOT") {
        search.order = db.sequelize.literal('"voteTotal" DESC')
      }

      search.offset = offset;
      search.limit = limit;

      const courseDiscussions = await db.courseDiscussion.findAndCountAll(search);
      courseDiscussions.page = page + 1;
      courseDiscussions.pageSize = pageSize;
      courseDiscussions.pageCount = Math.ceil(
        courseDiscussions.count / courseDiscussions.pageSize
      );
      // courseDiscussions.rows = courseDiscussions.rows.map(p => p.dataValues)

      resolve(courseDiscussions)
    })
  }

  /**
   * Save a courseDiscussion.
   * @param {courseDiscussion} courseDiscussionObject - { name } It takes all the "courseDiscussion" properties except id.
   * @returns {courseDiscussion} - It returns the same object but with an id.
   * @example 
   *  await courseDiscussionLogic.addOne({
   *    name: "name",
   *  })
   */
  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const newCourseDiscussion = db.courseDiscussion.build(args);

      resolve(await newCourseDiscussion.save())
    })
  }

  /**
   * Update a courseDiscussion.
   * @param {courseDiscussion} courseDiscussionObject - { id, name } It takes all the "role" properties. Id is required.
   * @returns {courseDiscussion} 
   * @example 
   *  await courseDiscussionLogic.updateOne([{
   *    id,
   *    name: "name",
   *  }])
   */
  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {
      const data = {
        ...args,
        hasBeenEdited: true
      };

      const courseDiscussion = await db.courseDiscussion.update(
        data,
        {
          where: { id: id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseDiscussion[0] !== 0 ? courseDiscussion[1][0] : null)
    })
  }

  /**
   * Delete a courseDiscussion. A soft delete from the column "is_deleted" becoming true.
   * @param {Object} idObject - { id } Id is required.
   * @returns {courseDiscussion} 
   * @example 
   *  await courseDiscussionLogic.deleteOne({
   *    id,
   *  })
   */
  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {

      const courseDiscussion = await db.courseDiscussion.update(
        { isDeleted: true },
        {
          where: { id: id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseDiscussion[0] !== 0 ? courseDiscussion[1][0] : null)
    })
  }


  return {
    getOneById,
    getManyWithPagination,
    addOne,
    updateOne,
    deleteOne,
  }

}


