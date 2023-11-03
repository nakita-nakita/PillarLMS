import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";

type input = {
  socketId: string,
  meetingId: string,
  url: string,
}

export default function requestUrlChange(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const lookUp = makeSocketLookUp(d)
    const getMeetingById = makeGetMeetingById(d)


    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId
    })


    // have to update based on focus to only send to focus tab. For now all leaders tabs
    meeting.data.sockets.map(s => {
      if (s.userId === meeting.data.leader.userId) {
        s.socket.emit('meeting-request-url', {
          userId: user.data.userId,
          url: args.url,
        })
      }
    })

    return {
      success: true
    }
  }
}