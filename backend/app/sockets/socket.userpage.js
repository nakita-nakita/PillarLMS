// Libraries
const { URL } = require('node:url');

// Mine
const { allSockets, updateSocket, getMetaBySocket } = require('./socket.store')

const getPageId = ({ search }) => {
  // https://www.example.com needed for URL function to work.
  const myUrl = new URL(`https://www.example.com${search}`);

  const pageId = myUrl.searchParams.get("id");

  return pageId;
}

const getUsersOnPageExceptSocket = ({ socket, location: { pathname, search } }) => {
  const pageId = getPageId({ search });
  const { user } = getMetaBySocket({ socket })[0]

  if (!user) {
    return []
  }

  const allUsersOnPage = allSockets.filter(socketListing => {
    if (socketListing[0]?.location?.pageId === pageId
      && socketListing[0]?.location?.pathname === pathname
      && socketListing[0]?.user?.id !== user.id) {
      return true
    }

    return false
  })

  return allUsersOnPage
}

const getUsersOnPage = ({ location: { pathname, search } }) => {
  const pageId = getPageId({ search });

  const allUsersOnPage = allSockets.filter(socketListing => {
    if (socketListing[0]?.location?.pageId === pageId
      && socketListing[0]?.location?.pathname === pathname) {
      return true
    }

    return false
  })

  return allUsersOnPage
}
// const broadcastUsersOnPage = ({ socket, location: { pathname, search } }) => {
//   const pageId = getPageId({ search });

//   const usersOnPage = allSockets.filter(socketListing => {
//     if (socketListing[0]?.location?.pageId === pageId
//       && socketListing[0]?.location?.pathname === pathname) {
//       return true
//     }

//     return false
//   })

//   const usersOnPage = usersOnPage.map(pageUser => {
//     return {
//       id: pageUser[0]?.user?.id,
//       username: pageUser[0]?.user?.username,
//       picture: pageUser[0]?.user?.picture,
//     }
//   })


//   usersOnPage.map(([meta, otherSocket]) => {
//     otherSocket.emit('user.joined-page.response', {

//       id,
//       username,
//       picture

//     })
//   })
//   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

//   // socket.emit('user.get-page-users.response', usersOnPage)
// }

const broadcastUsersOnPage = ({ socket, location: { pathname, search } }) => {
  const usersOnPage = getUsersOnPage({ location: { pathname, search } })
  const data = usersOnPage.map(([meta]) => {
    return {
      id: meta.user.id,
      username: meta.user.username,
      picture: meta.user.picture
    }
  })


  usersOnPage.map(([meta, otherSocket]) => {
    otherSocket.emit('user.get-page-users.response', data)
  })
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

}

const updateSocketUserPage = ({ socket, location: { search, pathname } }) => {
  return new Promise((resolveMain) => {

    const pageId = getPageId({ search });

    updateSocket({ socket, location: { search, pathname, pageId } }).then(() => {
      console.log('!!! socket updated')
      resolveMain()
    })
  })
}

const userEnterPageResponse = ({ socket, location: { pathname, search } }) => {
  const { user: { id, username, picture } } = getMetaBySocket({ socket })[0]
  const getAllUsersOnPage = getUsersOnPageExceptSocket({ socket, location: { pathname, search } });

  getAllUsersOnPage.map(([meta, otherSocket]) => {
    otherSocket.emit('user.joined-page.response', {

      id,
      username,
      picture

    })
  })

  console.log('!!! new page', { location: { pathname, search } })
}


const userLeftPageResponse = ({ socket, location: { pathname, search } }) => {
  const { user: { id, username } } = getMetaBySocket({ socket })[0]
  const getAllUsersOnPage = getUsersOnPageExceptSocket({ socket, location: { pathname, search } });

  getAllUsersOnPage.map(([meta, otherSocket]) => {
    otherSocket.emit('user.left-page.response', {
      id,
      username
    })
  })

  console.log('!!! old page', { location: { pathname, search } })
  // broadcastUsersOnPage({ socket, location: { pathname, search } })
}

loadFeature_UsersOnPage = ({ socket }) => {
  socket.on('user.joined-page', ({ location: { pathname, search } }) => {
    updateSocketUserPage({ socket, location: { pathname, search } }).then(() => {
      console.log('!!!!!!!!!!!! broad casting!!!!!!!')
      broadcastUsersOnPage({ socket, location: { pathname, search } })
    }).catch(err => {
      console.error('error', err)
    })
    userEnterPageResponse({ socket, location: { pathname, search } })
  })

  socket.on('user.left-page', ({ location: { pathname, search } }) => {
    updateSocketUserPage({ socket, location: { pathname: undefined, search: undefined } }).then(() => {
      broadcastUsersOnPage({ socket, location: { pathname, search } })
    }).catch(err => {
      console.error('error', err)
    })
    userLeftPageResponse({ socket, location: { pathname, search } })
    // socket.emit('user.get-page-users.response', usersOnPage)
  })

  socket.on('user.get-page-users', ({ location: { pathname, search } }) => {
    broadcastUsersOnPage({ socket, location: { pathname, search } })
  })
}

module.exports = {
  loadFeature_UsersOnPage,
  userLeftPageResponse
}

