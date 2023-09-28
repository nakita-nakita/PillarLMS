import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";

type input = {
  socketId: string,
  meetingId: string,
  userId: string,
  newLeaderUserId: string,
}

export default function changeLeader(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)


    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    // only leader can change leader
    if (meeting.data.leader.userId !== args.userId) {
      return {
        success: false
      }
    }

    for (let i = 0; i < meeting.data.sockets.length; i++) {
      const s = meeting.data.sockets[i];

      if (s.userId === args.newLeaderUserId) {
        meeting.data.leader = s
      }
      s.socket.emit('meeting-change-leader', {
        message: "Meeting leader has changed."
      })

    }

    return {
      success: true
    }
  }
}