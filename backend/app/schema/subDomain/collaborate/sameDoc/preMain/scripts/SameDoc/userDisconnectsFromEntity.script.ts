import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  socketId: string,
  entity: string,
}

export default function userDisconnectsFromEntity(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    // remove entity from user socket look up
    const userSocketLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    userSocketLookUp.data.entities =  userSocketLookUp.data.entities.filter(entity => entity !== args.entity)

    // remove socket from entity
    const entity = singleton.data.sameDoc[args.entity]

    entity.removeSocket({
      socketId: args.socketId,
    })

    return {
      success: true,
    }
  }
}


