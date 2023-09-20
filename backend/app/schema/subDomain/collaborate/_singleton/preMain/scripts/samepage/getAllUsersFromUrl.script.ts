import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";

type input = {
  url: string
}

export default function getAllUsersFromUrl(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const currentUserIds = []
    const data = singleton.data.socketLookUp.filter(s => {
      if (s.pathname === args.url) {
        if (!_.includes(currentUserIds, s.userId)) {
          currentUserIds.push(s.userId)
          return true
        }
      }

      return false
    })

    // typescript mad at this line
    // const data = _.uniqBy(pages, 'userId')

    return {
      success: true,
      data,
    }
  }
}


