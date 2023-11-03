import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  socketId;
}

export default function getLookUpBySocketId(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const data = singleton.data.socketLookUp.filter(s => {
      if (s.socketId === args.socketId) {
        return true
      }

      return false
    })

    return {
      success: true,
      data: data[0]
    }
  }
}


