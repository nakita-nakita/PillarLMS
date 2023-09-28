import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";

type input = {
  socketId: string,
  meetingId: string,
  userId: string,
}

export default function kickUserFromMeeting(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)


    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    const socketUserLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // only the meeting leader can kick a user
    if (meeting.data.leader.userId !== socketUserLookUp.data.userId) {
      return {
        success: false,
      }
    }

    const kickedUserLookUp = await lookUp.getSocketsByUserId({
      userId: args.userId,
    })

    const username = await lookUp.getUsernameForSocket({
      socketId: kickedUserLookUp.data[0].socketId
    })

    // // kick user
    for (let i = meeting.data.sockets.length - 1; i >= 0; i--) {
      const s = meeting.data.sockets[i];

      if (s.userId === args.userId) {
        s.socket.emit('meeting-kick')

        s.meetingId = null;

        meeting.data.sockets.splice(i, 1)

      } else {
        s.socket.emit('meeting-info', {
          message: `${username.data} has been kicked from meeting.`
        })
      }
    }

    return {
      success: true
    }
  }
}