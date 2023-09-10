/**
 * The functions responsible for handling the courseDiscussionComment type.
 * @module courseDiscussionComment_logic
 */

 module.exports = (db) => {
  const Op = db.Sequelize.Op;

  /**
   * Find a courseDiscussionComment by Id.
   * @param {Object} idObject - {id: 1} 
   * @returns {courseDiscussionComment}
   * @example 
   *  await courseDiscussionCommentLogic.getOneById({
   *    id
   *  })
   */
  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const courseDiscussionComment = await db.courseDiscussionComment.findOne({ 
        where: { 
          id, 
          isDeleted: false 
        }, 
        raw: true,
      });

      resolve(courseDiscussionComment)
    })
  }

  /**
   * Find many courseDiscussionComments with pagination.
   * @param {searchParam} paginationObject - {q, page, pageSize}
   * @returns {pagination<courseDiscussionComment>}
   * @example 
   *  await courseDiscussionCommentLogic.getManyWithPagination({
   *    q: "search",
   *    page: 2,
   *    pageSize:2
   *  })
   */
  const getManyWithPagination = ({ courseDiscussionId, page, pageSize }) => {
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
        where: {
          courseDiscussionId,
          isDeleted: false,
        },
        raw: true,
      };

      search.offset = offset;
      search.limit = limit;

      const courseDiscussionComments = await db.courseDiscussionComment.findAndCountAll(search);
      courseDiscussionComments.page = page + 1;
      courseDiscussionComments.pageSize = pageSize;
      courseDiscussionComments.pageCount = Math.ceil(
        courseDiscussionComments.count / courseDiscussionComments.pageSize
      );

      resolve(courseDiscussionComments)
    })
  }

  /**
   * Save a courseDiscussionComment.
   * @param {courseDiscussionComment} courseDiscussionCommentObject - { name } It takes all the "courseDiscussionComment" properties except id.
   * @returns {courseDiscussionComment} - It returns the same object but with an id.
   * @example 
   *  await courseDiscussionCommentLogic.addOne({
   *    name: "name",
   *  })
   */
  const addOne = (args) => {
    return new Promise(async (resolve, reject) => {

      const newCourseDiscussionComment = db.courseDiscussionComment.build(args);

      resolve(await newCourseDiscussionComment.save())
    })
  }

  /**
   * Update a courseDiscussionComment.
   * @param {courseDiscussionComment} courseDiscussionCommentObject - { id, name } It takes all the "role" properties. Id is required.
   * @returns {courseDiscussionComment} 
   * @example 
   *  await courseDiscussionCommentLogic.updateOne([{
   *    id,
   *    name: "name",
   *  }])
   */
  const updateOne = ({ id, ...args }) => {
    return new Promise(async (resolve, reject) => {
      const courseDiscussionComment = await db.courseDiscussionComment.update(
        {
          ...args,
          hasBeenEdited: true,
        },
        {
          where: { id: id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseDiscussionComment[0] !== 0 ? courseDiscussionComment[1][0] : null)
    })
  }

  /**
   * Delete a courseDiscussionComment. A soft delete from the column "is_deleted" becoming true.
   * @param {Object} idObject - { id } Id is required.
   * @returns {courseDiscussionComment} 
   * @example 
   *  await courseDiscussionCommentLogic.deleteOne({
   *    id,
   *  })
   */
  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {

      const courseDiscussionComment = await db.courseDiscussionComment.update(
        { isDeleted: true },
        {
          where: { id: id, isDeleted: false },
          returning: true,
          raw: true,
        }
      );

      resolve(courseDiscussionComment[0] !== 0 ? courseDiscussionComment[1][0] : null)
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


