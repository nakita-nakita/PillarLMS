import _ from "lodash";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { meetingType } from "./meeting.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getAllMeetings(d: dependencies) {

  return async (): Promise<returningSuccessObj<meetingType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.meetings) {
      // init if doesn't exist.
      singleton.data.meetings = []
    }

    return {
      success: true,
      data: singleton.data.meetings,
    }
  }
}


