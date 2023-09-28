import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";

export default function getAllMeetings(d: d_allDomain) {

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


