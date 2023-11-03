import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { meetingType } from "./meeting.types";
import { v4 as uuidv4 } from "uuid"

type input = {
  meetingId: string
}

export default function getMeetingById(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<meetingType>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.meetings) {
      // init if doesn't exist.
      singleton.data.meetings = []
    }

    for (let i = 0; i < singleton.data.meetings.length; i++) {
      const meeting = singleton.data.meetings[i];
      
      if(meeting.id === args.meetingId) {
        return {
          success: true,
          data: meeting
        }
      }
    }

    return {
      success: false,
      data: null,
    }
  }
}


