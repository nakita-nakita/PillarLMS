import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeGetMeetingById from "./getMeetingById.script";
import { meetingType } from "./meeting.types";

type input = {
  meetingId: string,
  name: string,
}

export default function changeName(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<meetingType>> => {

    const getMeetingById = makeGetMeetingById(d)

    const meeting = await getMeetingById({
      meetingId: args.meetingId
    })

    meeting.data.name = args.name

    meeting.data.sockets.map(s => {
      s.socket.emit("meeting-change-name", {
        name: args.name
      })
    })

    return {
      success: true,
    }
  }
}


