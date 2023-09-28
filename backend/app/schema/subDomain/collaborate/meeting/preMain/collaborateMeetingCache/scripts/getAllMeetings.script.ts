import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeMeeting from "../../../../_singleton/preMain/meetings.ram-cache";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import _ from "lodash"

export default function getAllMeetings(d: d_allDomain) {

  return async (): Promise<returningSuccessObj<meetingType[]>> => {

    const meeting = makeMeeting(d)

    const result = await meeting.getAllMeetings()

    //clean-up userId should be id in this context
    const data = [...result.data].map(l => {
      // id is for user display
      l.leader.id = l.leader.userId

      // users is used instead of sockets for user display
      l.users = l.sockets

      // user can have multiple sockets so this removes duplicate for user display.
      const currentUserIds = []
      l.users = l.users.filter(s => {
        if (!_.includes(currentUserIds, s.userId)) {
          currentUserIds.push(s.userId)
          s.id = s.userId
          return true
        }

        return false
      })


      return l
    })

    return {
      success: true,
      data,
    }
  }
}


