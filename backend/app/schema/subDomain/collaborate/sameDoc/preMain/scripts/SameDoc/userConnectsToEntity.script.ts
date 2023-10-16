import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  socketId: string,
  entity: string,
}

export default function userConnectsToEntity(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    // add entity to user look up
    const userSocketLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    userSocketLookUp.data.entities.push(args.entity)

    // add socket to entity
    const entity = singleton.data.sameDoc[args.entity]

    entity.sockets.push(userSocketLookUp.data)
    return {
      success: true,
    }
  }
}


