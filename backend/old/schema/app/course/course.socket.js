const Delta = require('quill-delta')
const db = require('../../../models/');
const { getPage, upsertPageWithData, removePage } = require('../../../sockets/socket.samedoc');
const { allSockets } = require('../../../sockets/socket.store');
const makeCourseLogic = require('./course.logic');

const courseLogic = makeCourseLogic(db);

const loadPage_courseDetails = ({ socket }) => {

  socket.on('admin.course.details', async ({ id }) => {
    const model = "course-details";
    const search = `?id=${id}`

    const pageBeforeUpdates = getPage({ location: { search }, model })

    if (!pageBeforeUpdates?.name?.data?.editorCursor?.value) {
      const course = await courseLogic.getOneById({ id })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "name", data: {
          editorCursor: {
            delta: new Delta().insert(course.name)
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "description", data: {
          editorCursor: {
            delta: new Delta().insert(course.description)
          }
        }
      })
    }

    // .emit('samePage.textChange.response', { fieldId, data })
    const page = getPage({ location: { search }, model });

    socket.emit("admin.course.details.response", {
      name: page["name"].data.editorCursor.value,
      description: page["description"].data.editorCursor.value
    })


    let socketIndex;
    for (let i = 0; i < allSockets.length; i++) {
      const element = allSockets[i];

      if (element[1].id === socket.id) {
        socketIndex = i;
        break;
      }
    }
    // socket
    if (socketIndex) {
      allSockets[socketIndex][0].model = model;
    }
  })

  socket.on('admin.course.details.leaving', async ({ id }) => {
    // const model = "course-details";
    // const search = `?id=${id}`


    //remove range anyone is on page else remove page
    // const nameRanges = getPage({ location: { search }, model, fieldId: "name" }).ranges
    // const descriptionRanges = getPage({ location: { search }, model, fieldId: "description" }).ranges


    removePage({ socket, id, model: "course-details" })

  })

  // socket.on('post.admin.course.details', async (newCourseObj) => {
  //   const objToSave = { ...newCourseObj }
  //   objToSave.id = undefined;

  //   const savedCourse = await db.course.update(
  //     objToSave,
  //     {
  //       where: { id: newCourseObj.id },
  //       returning: true,
  //     }
  //   );

  //   const course = savedCourse[0] !== 0 ? savedCourse[1][0].dataValues : null

  //   socket.emit("post.admin.course.details.response", {
  //     name: getPage({ location: { search }, model, fieldId: "name" }).value,
  //     description: getPage({ location: { search }, model, fieldId: "description" }).value
  //   })
  // })

}


module.exports = {
  loadPage_courseDetails
}