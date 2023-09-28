import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";

type input = {
  socketId: string,
  meetingId: string,
}

export default function join(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<meetingType>> => {


    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)

    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    if (!meeting.data) {
      const s = await lookUp.getLookUpBySocketId({
        socketId: args.socketId
      })

      s.data.socket.emit('meeting-doesnt-exist')

      return {
        success: true
      }
    }

    const socketUserLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // socket log for the meeting
    socketUserLookUp.data.meetingId = meeting.data.id

    // add socket to meeting
    meeting.data.sockets.push(socketUserLookUp.data)

    // notification all sockets in the meeting that this user if this is the first user socket
    const isFirstSocket = meeting.data.sockets.filter(s => s.userId === socketUserLookUp.data.userId).length <= 1

    if (isFirstSocket) {
      // get this socket username for message      
      const username = await lookUp.getUsernameForSocket({
        socketId: args.socketId
      })

      // send message to all sockets that new user joined.
      meeting.data.sockets.map(s => {
        if (s.userId !== socketUserLookUp.data.userId) {
          s.socket.emit('meeting-user-join', {
            message: `${username.data} has joined the meeting.`
          })
        }
      })
    }

    return {
      success: true,
    }
  }
}


