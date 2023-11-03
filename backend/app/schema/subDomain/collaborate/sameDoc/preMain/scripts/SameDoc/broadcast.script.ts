import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  entity: string,
  socketId: string,
  socketChannel: string,
  socketBufferChannel?: string,
  data: any,
}

export default function broadcast(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    if (!singleton.data.sameDoc[args.entity]) {
      return {
        success: true,
        humanMessage: "No entities to update."
      }
    }

    for (let i = 0; i < singleton.data.sameDoc[args.entity].sockets.length; i++) {
      const socket = singleton.data.sameDoc[args.entity].sockets[i];

      if (socket.socketId !== args.socketId) {
        socket.socket.emit(args.socketChannel, args.data)
      }

      if (args.socketBufferChannel) {
        socket.socket.emit(args.socketBufferChannel, args.data)
      }
    }

    return {
      success: true,
      result: !!singleton.data.sameDoc[args.entity],
    }
  }
}


