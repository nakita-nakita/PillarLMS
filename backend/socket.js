const db = require("./app/models");
const { loadPage_courseDetails } = require("./app/schema/app/course/course.socket");
const { loadPage_courseSettingsPage } = require("./app/schema/app/courseSettings/courseSettings.socket");
const makeAuthLogic = require("./app/schema/user/auth/auth.logic");
const makeUserLogic = require("./app/schema/user/user/user.logic");
const { loadFeature_sameDoc, removePage } = require("./app/sockets/socket.samedoc");

const authLogic = makeAuthLogic(db)
const userLogic = makeUserLogic(db)

const { allSockets, getMetaBySocket, addSocket, removeSocket } = require('./app/sockets/socket.store');
const { loadFeature_UsersOnPage, userLeftPageResponse } = require("./app/sockets/socket.userpage");

const ioGateway = async socket => {
  const userInfo = await authLogic.getuserIdFromToken({ token: socket.handshake.auth.token });

  console.log('!!! log (ioGateway, first log for userInfo and token): New User', userInfo, socket.handshake.auth.token)
  if (!userInfo || !userInfo.userId) {
    return;
  }

  const user = await userLogic.getOneById({ id: userInfo.userId })
  if (user) {
    user.picture = user.profile?.picture
  }

  addSocket({ socket, user });

  // if (user.isAdmin) { // add permissions
  loadPage_courseDetails({ socket, allSockets })
  loadPage_courseSettingsPage({ socket })
  // }

  // if (user) {
  loadFeature_UsersOnPage({ socket })
  loadFeature_sameDoc({ socket, user })
  // }

  // console.log('!!! log (ioGateway, second log for user and all socket length): New User', user.username, allSockets.length)

  // socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => {
    const { location } = getMetaBySocket({ socket })[0]
    removePage({ socket }).then(() => {
      if (location?.pathname) {
        userLeftPageResponse({ socket, location })
      }

      removeSocket({ socket })
    })

    // console.log('!!! log (disconnect, username and all socket length)', user.username, allSockets.length)
  });
}




module.exports = {
  ioGateway
}