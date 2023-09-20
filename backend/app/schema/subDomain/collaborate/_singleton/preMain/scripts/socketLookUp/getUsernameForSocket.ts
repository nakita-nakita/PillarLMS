import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  socketId;
}

export default function getUsernameForSocket(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<string>> => {

    let success = false
    let data: string = undefined

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookUp = singleton.data.socketLookUp[i];

      if (lookUp.socketId === args.socketId) {
        switch (lookUp.callByType) {
          case "EMAIL":
            data = lookUp.email
            break;
          case "USERNAME":
            data = lookUp.username
            break;
          case "FIRST_NAME":
            data = lookUp.firstName
            break;
          case "LAST_NAME":
            data = lookUp.lastName
            break;
          case "FULL_NAME":
            data = lookUp.fullName
            break;
          default:
            data = lookUp.email
            break;
        }

        break;
      }
    }

    return {
      success,
      data
    }
  }
}


