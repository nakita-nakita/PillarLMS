import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { RealTimeAllAdapters } from "./set.script";

type input = {
  entity: string,
  name: string,
}

export default function getByPropertyName(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<RealTimeAllAdapters>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    if (!singleton.data.sameDoc[args.entity]) {
      return {
        success: true,
        data: undefined
      }
    }

    if (!singleton.data.sameDoc[args.entity]?.props[args.name]) {
      return {
        success: true,
        data: undefined
      }
    }

    return {
      success: true,
      data: singleton.data.sameDoc[args.entity]?.props[args.name],
    }
  }
}


