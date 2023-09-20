import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import { meeting } from "./meeting.types";
import { v4 as uuidv4 } from "uuid"

type input = {
  name: string,
  url: string,
  userId: string,
  // socketId?: string,
}

export default function get(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<meeting>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.meeetings) {
      // init if doesn't exist.
      singleton.data.meeetings = []
    }

    const lookUp = makeSocketLookUp(d)

    const leader = lookUp.getSocketsByUserId({
      userId: args.userId
    })

    singleton.data.meeetings.push({
      id: uuidv4(),
      name: args.name,
      url: args.url,
      leader
    })


    return {
      success: true,
      data: singleton.data.socketLookUp
    }
  }
}


