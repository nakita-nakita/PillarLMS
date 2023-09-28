import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-change-name', async (data) => {
    const meeting = makeMeeting(d)

    await meeting.changeName({
        meetingId: data.meetingId,
        name: data.name
    })
  });
}