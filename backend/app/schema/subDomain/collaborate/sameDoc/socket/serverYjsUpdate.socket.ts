



import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../_singleton/preMain/_singleton.ram-cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-yjs-update', async ({
    entity,
    id,
    doc
  }) => {


    let success = false;
    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookup = singleton.data.socketLookUp[i];

      //testing: any socket not mine... sameDoc not completed, yet.
      if (lookup.socketId !== socket.id) {
        lookup.socket.emit("yjs-update", {
          entity,
          id,
          doc
        })

      }
    }

  });
}

