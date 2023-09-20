import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { singleton } from "./_singleton.private";

type input = {
  location: string
  key: string
  value: string
}

export default function set(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const data = singleton
    singleton[args.location] = singleton[args.location] || {}
    singleton[args.location][args.key] = singleton[args.location][args.key] || {}
    singleton[args.location][args.key] = args.value

    return {
      success: true,
      data,
    }
  }
}


