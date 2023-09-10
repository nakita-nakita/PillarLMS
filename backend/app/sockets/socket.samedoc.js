// const db = require('../models')
// const makeCourseLogic = require("../schema/app/course/course.logic")
const { allSockets, updateSocket, getMetaBySocket } = require('./socket.store')

// const courseLogic = makeCourseLogic(db);

const pages = {};

const getPageId = ({ search }) => {
  // https://www.example.com needed for URL function to work.
  const myUrl = new URL(`https://www.example.com${search}`);

  const pageId = myUrl.searchParams.get("id");

  return pageId;
}

const getPage = ({ location: { search }, model }) => {
  const pageId = getPageId({ search });

  return pages[`${model}${pageId}`]
}

const upsertPageWithData = async ({ socket, location: { search }, fieldId, data, model, user }) => {
  return new Promise((resolve) => {
    const pageId = getPageId({ search });

    if (!pages[`${model}${pageId}`]) {
      pages[`${model}${pageId}`] = {};
    }

    if (!pages[`${model}${pageId}`][fieldId]) {
      pages[`${model}${pageId}`][fieldId] = {};
    }

    if (!pages[`${model}${pageId}`][fieldId].model) {
      pages[`${model}${pageId}`][fieldId].model = model;
    }

    if (!pages[`${model}${pageId}`][fieldId].data) {
      pages[`${model}${pageId}`][fieldId].data = {};
    }

    if (data?.setOnce) {
      pages[`${model}${pageId}`][fieldId].data.setOnce = data.setOnce;
    }

    if (data?.value !== undefined) {
      pages[`${model}${pageId}`][fieldId].data.value = data.value
    }

    if (data?.editorCursor && !pages[`${model}${pageId}`][fieldId].data?.editorCursor?.value) {
      pages[`${model}${pageId}`][fieldId].data.editorCursor = {
        value: undefined,
        ranges: [],
      }
    }


    if (data?.editorCursor?.range) {
      const { ranges } = pages[`${model}${pageId}`][fieldId].data.editorCursor
      let index;

      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];

        if (range[0].id === socket.id) {
          index = i;
          break;
        }
      }

      if (index) {
        ranges[index][1] = data.editorCursor.range;
      } else {
        ranges.push([socket, data.editorCursor.range])
      }
    }

    if (data?.editorCursor?.delta) {
      const { value } = pages[`${model}${pageId}`][fieldId].data.editorCursor
      if (value) {
        pages[`${model}${pageId}`][fieldId].data.editorCursor.value = value.compose(data.editorCursor.delta)
      } else {
        pages[`${model}${pageId}`][fieldId].data.editorCursor.value = data.editorCursor.delta
      }
    }

    if (data.manyUsersSelect) {
      pages[`${model}${pageId}`][fieldId].data = {
        ...pages[`${model}${pageId}`][fieldId].data,
        manyUsersSelect: data.manyUsersSelect
      }
    }

    if (data.manyUserSelectRemove) {
      const manyUserSelectArray = pages[`${model}${pageId}`][fieldId].data.manyUsersSelect.value;
      pages[`${model}${pageId}`][fieldId].data.manyUsersSelect.value = [...manyUserSelectArray.filter(mus => {
        return mus.value !== data.manyUserSelectRemove.value
      })]
    }

    if (data.manyUserSelectAdd) {
      pages[`${model}${pageId}`][fieldId].data.manyUsersSelect.value.push(data.manyUserSelectAdd)
    }

    if (data.checkbox) {
      pages[`${model}${pageId}`][fieldId].data.checkbox = {
        ...pages[`${model}${pageId}`][fieldId].data.checkbox || {},
        ...data.checkbox,
      }
      pages[`${model}${pageId}`][fieldId].data.user = {
        ...pages[`${model}${pageId}`][fieldId].data.user,
        ...user,
      }
    }

    // pages[`${model}${pageId}`][fieldId].data = {
    //   ...pages[`${model}${pageId}`][fieldId].data,
    //   data
    // }

    resolve({ success: true })
  })
}

const removePage = ({ socket, model, id }) => {
  return new Promise((resolve) => {

    const myMeta = getMetaBySocket({ socket });
    if (!model) {
      model = myMeta[0].model
    }

    if (!id) {
      id = myMeta[0].location?.pageId
    }

    if (!model || !id) {
      return resolve({ success: true })
    }
    // const pageId = getPageId({ search: location.search });
    const usersOnPage = allSockets.filter(as => {
      if (!as[0].location?.search || as[1].id === socket.id) {
        return false;
      }

      const pageId = as[0].location?.pageId || getPageId({ search: as[0].location.search });

      return model && pageId && as[0].model === model && pageId === id;
    })


    if (usersOnPage.length > 0) {
      const page = pages[`${model}${id}`]

      // remove cursors left on page.
      for (let prop in page) {
        if (!page[prop].data?.editorCursor) {
          continue;
        }
        const { ranges } = page[prop].data.editorCursor;

        for (let i = 0; i < ranges.length; i++) {
          const rangeRecord = ranges[i];

          if (rangeRecord[0].id === socket.id) {
            ranges.splice(i, 1);

            usersOnPage.map(([meta, otherSocket]) => {
              otherSocket.emit('samePage.selectionChange.response', {

                fieldId: prop,
                data: {
                  user: {
                    id: myMeta[0].user.id
                  },
                  editorCursor: { range: null }
                }
              })
            })
            break;
          }
        }
      }
    } else {
      delete pages[`${model}${id}`]

    }

    resolve({ success: true })

  })
}

const getUsersOnPageCount = ({ location: { search, pathname } }) => {
  return new Promise((resolve) => {

    const usersOnPage = allSockets.filter((value, index, self) => {
      return self.findIndex(v => v[0].user.id === value[0].user.id) === index;
    })

    resolve({ success: true, count: usersOnPage.length });
  })
}


const getAllMetaSocketsButThisSocket = ({ socket, location: { pathname, search } }) => {
  const pageId = getPageId({ search });
  // const { user } = getMetaBySocket({ socket })[0]

  // if (!user) {
  //   return []
  // }

  const allUsersOnPage = allSockets.filter(socketListing => {
    if (socketListing[0]?.location?.pageId === pageId
      && socketListing[0]?.location?.pathname === pathname
      && socketListing[1]?.id !== socket.id) {
      return true
    }

    return false
  })

  return allUsersOnPage
}

const saveDocument = ({ model, id, message }) => {

  const allUsersOnPage = allSockets.filter(socketListing => {
    if (socketListing[0]?.location?.pageId === id
      && socketListing[0]?.model === model) {
      return true
    }

    return false
  })

  allUsersOnPage.map(([meta, otherSocket]) => {
    otherSocket.emit('admin.documentSaved', {
      message
    })
  })

}



const loadFeature_sameDoc = ({ socket, user }) => {
  socket.on('samePage.updateField', ({ location: { pathname, search }, fieldId, type, data, model }) => {
    const sockets = getAllMetaSocketsButThisSocket({ socket, location: { pathname, search } })

    data.user = {};
    data.user.id = user.id;
    data.user.username = user.username;
    data.user.picture = user.profile?.picture;
    data.fieldId = fieldId

    upsertPageWithData({ socket, location: { search }, fieldId, data, type, model, user: data.user })

    switch (type) {
      case "text-change":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('samePage.textChange.response', { fieldId, data })
        })
        return;
      case "selection-change":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('samePage.selectionChange.response', { fieldId, data })
        })
        return;
      case "checkbox":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('samePage.checkboxChange.response', { fieldId, data })
        })
        return;

      case "manyUserSelect-add":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('samePage.manyUserSelectAdd.response', { fieldId, data })
        })
        return;

      case "manyUserSelect-remove":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('samePage.manyUserSelectRemove.response', { fieldId, data })
        })
        return;

      case "modal":
        sockets.map(([meta, otherSocket]) => {
          otherSocket.emit('admin.course.settings.deleteModal.response', { fieldId, data })
        })
        return;

    }


    // updateSocketUserPage({ socket, location: { pathname, search } }).then(() => {
    //   console.log('!!!!!!!!!!!! broad casting!!!!!!!')
    //   broadcastUsersOnPage({ socket, location: { pathname, search } })
    // }).catch(err => {
    //   console.error('error', err)
    // })
    // userEnterPageResponse({ socket, location: { pathname, search } })
  })
}


module.exports = {
  loadFeature_sameDoc,
  pages,
  upsertPageWithData,
  removePage,
  getUsersOnPageCount,
  getPage,
  saveDocument,
}
