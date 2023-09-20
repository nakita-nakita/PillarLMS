import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  socketId: string,
  meetingId: string,
  channel: string,
  data: any
}

export default function broadcastByMeetingId(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const lookUp = singleton.data.socketLookUp.filter(s => {
      if (s.meetingId === args.meetingId && s.socketId !== args.socketId) {
        return true
      }
      return false
    })

    for (let i = 0; i < lookUp.length; i++) {
      lookUp[i].socket.emit(args.channel, args.data)      
    }


    return {
      success: true,
    }
  }
}


