import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { meetingType } from "./meeting.types";

type input = {
  url: string
}

export default function getMeetingsForUrl(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<meetingType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.meetings) {
      // init if doesn't exist.
      singleton.data.meetings = []
    }

    const data = singleton.data?.meetings.filter(m => m.url === args.url)

    return {
      success: false,
      data,
    }
  }
}


