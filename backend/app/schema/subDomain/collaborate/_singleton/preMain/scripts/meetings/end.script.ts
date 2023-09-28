import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";

type input = {
  socketId: string,
  meetingId: string,
}

export default function end(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)

    const singleton = await singletonFunc.get()

    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    const socketUserLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // only the meeting leader can end a meeting
    if (meeting.data.leader.userId !== socketUserLookUp.data.userId) {
      return {
        success: false,
      }
    }

    // end meeting for all sockets in meeting
    for (let i = meeting.data.sockets.length -1; i >= 0; i--) {
      const socket = meeting.data.sockets[i];
      
      socket.socket.emit('meeting-end')

      socket.meetingId = null;
    }

    // remove meeting from singleton
    for (let i = 0; i < singleton.data.meetings.length; i++) {
      const meeting = singleton.data.meetings[i];

      if (meeting.id === args.meetingId) {
        singleton.data.meetings.splice(i, 1)
        break;
      }
      
    }

    return {
      success: true
    }
  }
}