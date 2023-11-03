import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  entity: string
}

export default function getByEntity(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    singleton.data.sameDoc[args.entity] = singleton.data.sameDoc[args.entity] || {}; 

    return {
      success: true,
      data: singleton.data.sameDoc[args.entity],
    }
  }
}


