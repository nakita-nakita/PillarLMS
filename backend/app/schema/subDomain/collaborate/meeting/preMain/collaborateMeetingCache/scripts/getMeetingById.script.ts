import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeMeeting from "../../../../_singleton/preMain/meetings.ram-cache";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import _ from "lodash"

type input = {
  id: string
}

export default function getMeetingById(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<meetingType>> => {

    const meeting = makeMeeting(d)

    const result = await meeting.getMeetingById({
      meetingId: args.id
    })

    const data = { ...result.data }

    // id is for user display
    data.leader.id = data.leader.userId
    data.users = data.sockets

    // user can have multiple sockets so this removes duplicate for user display.
    const currentUserIds = []
    data.users = data.users.filter(s => {
      if (!_.includes(currentUserIds, s.userId)) {
        currentUserIds.push(s.userId)
        s.id = s.userId
        return true
      }

      return false
    })

    return {
      success: true,
      data,
    }
  }
}


