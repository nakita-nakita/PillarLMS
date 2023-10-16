import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  socketId: string,
}

export default function socketDisconnect_removeFromEntities(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    // WARNING: this file does not remove entities from the socket look up. It is assume the socket is disconnecting.

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId
    })

    for (let i = 0; i < user.data.entities.length; i++) {
      const entity = singleton.data.sameDoc[user.data.entities[i]];

      if (entity) {
        await entity.removeSocket({
          socketId: user.data.socketId,
        })
      }
    }



    return {
      success: true,
    }
  }
}


