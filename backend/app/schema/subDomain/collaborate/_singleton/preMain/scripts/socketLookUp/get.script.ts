import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function get(d: dependencies) {

  return async (): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }
    
    return {
      success: true,
      data: singleton.data.socketLookUp
    }
  }
}


