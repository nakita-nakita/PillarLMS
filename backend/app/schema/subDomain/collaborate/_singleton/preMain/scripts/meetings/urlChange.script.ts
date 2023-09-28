import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";

type input = {
  socketId: string,
  meetingId: string,
  url: string,
}

export default function urlChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)


    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    const socketUserLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // only the meeting leader can change url
    if (meeting.data.leader.userId !== socketUserLookUp.data.userId) {
      return {
        success: false,
      }
    }

    
    meeting.data.url = args.url

    for (let i = meeting.data.sockets.length - 1; i >= 0; i--) {
      const s = meeting.data.sockets[i];

      // update all sockets except current socket, only one socket in the lead preloading everything.
      if (s.socket.id !== args.socketId) {
        s.socket.emit('meeting-change-url', {
          url: args.url,
        })
      }
    }

    return {
      success: true
    }
  }
}