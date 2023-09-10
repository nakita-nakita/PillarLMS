const Delta = require('quill-delta')
const { getPage, upsertPageWithData, removePage } = require('../../../sockets/socket.samedoc');
const { allSockets } = require('../../../sockets/socket.store');
const { getCourseSettingsPage } = require('./courseSettings.main');


const model = "course-settings";

const loadPage_courseSettingsPage = ({ socket }) => {

  socket.on('admin.course.settings', async ({ id }) => {
    const search = `?id=${id}`

    const pageBeforeUpdates = getPage({ location: { search }, model })

    if (!pageBeforeUpdates || !pageBeforeUpdates["canAllCreatorsRead"]) {
      const courseSettingsPage = await getCourseSettingsPage({ id })
      // const course = await courseLogic.getOneById({ id })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "courseName", data: {
          setOnce: {
            value: courseSettingsPage.data.courseName
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "canAllCreatorsRead", data: {
          checkbox: {
            value: courseSettingsPage.data.courseSettings.canAllCreatorsRead
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "canAllCreatorsUpdate", data: {
          checkbox: {
            value: courseSettingsPage.data.courseSettings.canAllCreatorsUpdate
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "ownerId", data: {
          userSelect: {
            value: courseSettingsPage.data.courseSettings.ownerId
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "readAccess", data: {
          manyUsersSelect: {
            value: courseSettingsPage.data.readAccess
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "settingAccess", data: {
          manyUsersSelect: {
            value: courseSettingsPage.data.settingAccess
          }
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "updateAccess", data: {
          manyUsersSelect: {
            value: courseSettingsPage.data.updateAccess
          }
        }
      })


      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "isDeleteModalOpen", data: {
          value: false
        }
      })

      await upsertPageWithData({
        socket, location: { search }, model, fieldId: "deleteInput", data: {
          editorCursor: {
            delta: new Delta().insert("")
          }
        }
      })
    }

    const page = getPage({ location: { search }, model })

    socket.emit("admin.course.settings.response", {
      courseName: page["courseName"].data,
      canAllCreatorsRead: page["canAllCreatorsRead"].data,
      canAllCreatorsUpdate: page["canAllCreatorsUpdate"].data,
      ownerId: page["ownerId"].data,
      readAccess: page["readAccess"].data,
      settingAccess: page["settingAccess"].data,
      updateAccess: page["updateAccess"].data,
      isDeleteModalOpen: page["isDeleteModalOpen"].data.value,
      deleteInput: page["deleteInput"].data.editorCursor?.value,

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

  socket.on('admin.course.settings.leaving', async ({ id }) => {
    // const model = "course-details";
    // const search = `?id=${id}`


    //remove range anyone is on page else remove page
    // const nameRanges = getPage({ location: { search }, model, fieldId: "name" }).ranges
    // const descriptionRanges = getPage({ location: { search }, model, fieldId: "description" }).ranges


    removePage({ socket, id, model })

  })

  socket.on('admin.course.settings.deletion', async ({ id }) => {
    const model = "course-settings";
    const search = `?id=${id}`

    const allUsersOnPage = allSockets.filter(socketListing => {
      if (socketListing[0]?.location?.pageId === id
        && socketListing[0]?.model === model
        && socketListing[1]?.id !== socket.id) {
        return true
      }
  
      return false
    })

    allUsersOnPage.map(([meta, otherSocket]) => {
      otherSocket.emit("admin.course.settings.deletion.response")
    })
    //remove range anyone is on page else remove page
    // const nameRanges = getPage({ location: { search } })
    // const descriptionRanges = getPage({ location: { search }, model, fieldId: "description" }).ranges


    // removePage({ socket, id, model })

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
  loadPage_courseSettingsPage
}