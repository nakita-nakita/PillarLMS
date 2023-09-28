import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";

type input = {
  meetingId: string,
}

export default function getUsersForMeeting(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const getMeetingById = makeGetMeetingById(d)

    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    // user can have multiple sockets so this removes duplicate for user display.
    const currentUserIds = []
    let data = meeting.data.sockets.filter(s => {
      if (!_.includes(currentUserIds, s.userId)) {
        currentUserIds.push(s.userId)
        return true
      }

      return false
    })

    data = data.map(s => {
      s.id = s.userId

      return s;
    })

    return {
      success: true,
      data,
    }
  }
}


