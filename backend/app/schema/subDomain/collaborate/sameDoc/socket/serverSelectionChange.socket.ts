import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../_singleton/preMain/_singleton.ram-cache";
import makeGetUsernameForSocket from "../../_singleton/preMain/scripts/socketLookUp/getUsernameForSocket";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-selection-change', async ({
    range
  }) => {


    let success = false;
    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const getUsernameForSocket = makeGetUsernameForSocket(d)
    const username = await getUsernameForSocket({
      socketId: socket.id,
    })

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookup = singleton.data.socketLookUp[i];

      //testing: any socket not mine... sameDoc not completed, yet.
      if (lookup.socketId !== socket.id) {
        lookup.socket.emit("remote-selection-change", {
          range,
          userColor: "blue",
          username: username.data,
          userId: socket.userId,
        })

      }
    }

  });
}
