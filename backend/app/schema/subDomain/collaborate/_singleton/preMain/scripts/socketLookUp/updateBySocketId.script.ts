import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";
import { CallByTypeEnum } from "../../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {

  //socket connection per tab
  socketId: string,
  socket?: any,

  // is user focus on that tab?
  isTabFocus?: boolean,

  //location
  asPath?: string, //with params
  pathname?: string, // without params

  //user
  userId?: string,
  email?: String
  firstName?: String
  lastName?: String
  username?: String
  picture?: String
  callByType?: CallByTypeEnum
  circleColor?: String
  labelColor?: String

  //displayName - for  
  displayName?: String,

  //sameDoc - for unsubscribing when socket disconnects
  entities?: any[],

  //meeting
  meetingId?: string,

}

export default function updateBySocketId(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType>> => {

    let success = false;
    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    let data

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookUp = singleton.data.socketLookUp[i];

      if (lookUp.socketId === args.socketId) {
        singleton.data.socketLookUp[i] = {
          ...singleton.data.socketLookUp[i],
          ...args,
        }

        success = true
        data = singleton.data.socketLookUp[i]
        break;
      }
    }

    return {
      success,
      data,
    }
  }
}


