import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { singleton } from "./_singleton.private";

type input = {
  location: string
  key: string
}

export default function remove(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const data = singleton

    if (singleton[args.location]) {
        delete singleton[args.location][args.key]
    }

    return {
      success: true,
      data,
    }
  }
}


