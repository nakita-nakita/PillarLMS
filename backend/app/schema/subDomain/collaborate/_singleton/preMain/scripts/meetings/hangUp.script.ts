import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";

type input = {
  socketId: string,
  meetingId: string,
}

export default function hangUp(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)

    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    const socketUserLookUp = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const username = await lookUp.getUsernameForSocket({
      socketId: args.socketId
    })

    for (let i = meeting.data.sockets.length -1; i >= 0; i--) {
      const socket = meeting.data.sockets[i];
      
      //if user than remove this socket, if not user than send message that user left.
      if (socket.userId === socketUserLookUp.data.userId) {
        
        socket.socket.emit('meeting-hang-up')

        socket.meetingId = null;

        meeting.data.sockets.splice(i, 1)
      } else {

        socket.socket.emit('meeting-user-left',{
          message: `${username.data} has left the meeting.`
        })
      }
    }

    return {
      success: true
    }
  }
}