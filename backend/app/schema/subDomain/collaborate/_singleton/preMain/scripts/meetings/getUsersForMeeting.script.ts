import _ from "lodash";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeGetMeetingById from "./getMeetingById.script";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  meetingId: string,
}

export default function getUsersForMeeting(d: dependencies) {

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


