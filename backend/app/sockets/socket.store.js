const allSockets = []; // [meta: {user, location, meeting}, socket]

const findMySocketWithMeta = ({ socket }) => {
  for (let i = 0; i < allSockets.length; i++) {
    const metaAndSocket = allSockets[i];

    if (socket?.id === metaAndSocket[1].id) {
      return [i, metaAndSocket];
    }
  }

  return [-1, null]
}

const addSocket = ({ socket, location, user }) => {
  allSockets.push([{ user, location }, socket])
}

const removeSocket = ({ socket }) => {
  return new Promise((resolve) => {
    const [allSocketIndex, mySocketWithMeta] = findMySocketWithMeta({ socket })
    
    if (allSocketIndex > 0) {
      allSockets.splice(allSocketIndex, 1);
    }
  })
  // for (let i = 0; i < allSockets.length; i++) {
  //   const metaAndSocket = allSockets[i];

  //   if (socket = metaAndSocket[1]) {
  //     allSockets.splice(i, 1);
  //     break;
  //   }
  // }
}

const updateSocket = ({ socket, location, user, meeting }) => {
  return new Promise((resolve) => {

    const [allSocketIndex, mySocketWithMeta] = findMySocketWithMeta({ socket })

    if (location) {
      mySocketWithMeta[0].location = location
    }

    if (user) {
      mySocketWithMeta[0].user = user
    }

    if (meeting) {
      mySocketWithMeta[0].meeting = meeting
    }

    resolve()
  })
}

const getMetaBySocket = ({ socket }) => {
  const [allSocketIndex, mySocketWithMeta] = findMySocketWithMeta({ socket })

  return mySocketWithMeta
}


module.exports = {
  allSockets,
  addSocket,
  removeSocket,
  updateSocket,
  getMetaBySocket,
}