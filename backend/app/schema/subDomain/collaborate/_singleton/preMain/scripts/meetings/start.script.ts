import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import { meetingType } from "./meeting.types";
import { v4 as uuidv4 } from "uuid"

type input = {
  name: string,
  url: string,
  socketId: string,
}

export default function start(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<meetingType>> => {

    const meetingId = uuidv4()

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    if (!singleton.data?.meetings) {
      // init if doesn't exist.
      singleton.data.meetings = []
    }

    const leader = await lookUp.getLookUpBySocketId({
      socketId: args.socketId
    })

    const data = {
      id: meetingId,
      name: args.name,
      url: args.url,
      leader: leader.data,
      sockets: [leader.data]
    }

    singleton.data.meetings.push(data)

    leader.data.meetingId = meetingId;

    return {
      success: true,
      data,
    }
  }
}


