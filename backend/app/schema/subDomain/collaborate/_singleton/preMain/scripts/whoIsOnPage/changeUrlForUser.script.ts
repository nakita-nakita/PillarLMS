import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";
import makeBoardcasters from "../../broadcasters.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";

type input = {
  socketId: string
  currentAsPath: string, //with params
  currentPathname: string, // without params
  oldAsPath?: string, //with params
  oldPathname?: string, // without params
}

export default function changeUrlForUser(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    let success = false;
    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookup = singleton.data.socketLookUp[i];
      
      if(lookup.socketId === args.socketId) {
        singleton.data.socketLookUp[i].asPath = args.currentAsPath
        singleton.data.socketLookUp[i].pathname = args.currentPathname
        success = true;

        const socketLookUp = makeSocketLookUp(d)
        const broadcasters = makeBoardcasters(d)

        const username = await socketLookUp.getUsernameForSocket({
          socketId: singleton.data.socketLookUp[i].socketId
        })

        await broadcasters.broadcastByUrl({
          url: args.currentPathname,
          channel: "user-enter-page",
          socketId: singleton.data.socketLookUp[i].socketId,
          data: {
            message: `${username.data} has entered the page.`
          }
        })

        await broadcasters.broadcastByUrl({
          url: args.oldPathname,
          channel: "user-left-page",
          socketId: singleton.data.socketLookUp[i].socketId,
          data: {
            message: `${username.data} has lefted the page.`
          }
        })

        break;
      }
    }

    return {
      success,
    }
  }
}


