import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  userId: string
}

export default function broadcastForNotification(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const lookUp = singleton.data.socketLookUp.filter(s => {
      if (s.userId === args.userId) {
        return true
      }
      return false
    })

    for (let i = 0; i < lookUp.length; i++) {
      lookUp[i].socket.emit("new-notification")
    }


    return {
      success: true,
    }
  }
}


