import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-join', async (data) => {
    const meeting = makeMeeting(d)

    await meeting.join({
      meetingId: data.meetingId,
      socketId: socket.id,
    })
  });
}