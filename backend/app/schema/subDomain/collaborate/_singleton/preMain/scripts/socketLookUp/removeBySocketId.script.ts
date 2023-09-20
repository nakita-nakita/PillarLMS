import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  socketId: string
}

export default function removeBySocketId(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    let success = false;
    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookUp = singleton.data.socketLookUp[i];

      if (lookUp.socketId === args.socketId) {
        singleton.data.socketLookUp.splice(i, 1);

        success = true
        break;
      }
    }

    return {
      success,
    }
  }
}


