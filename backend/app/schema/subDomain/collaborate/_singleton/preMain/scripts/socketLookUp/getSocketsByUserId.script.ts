import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  userId;
}

export default function getSocketsByUserId(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const data = singleton.data.socketLookUp.filter(s => {
      if (s.userId === args.userId) {
        return true
      }

      return false
    })

    return {
      success: true,
      data
    }
  }
}


