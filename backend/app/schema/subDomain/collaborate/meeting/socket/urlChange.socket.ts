import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-url-change', async (data) => {
    const meeting = makeMeeting(d)

    await meeting.urlChange({
      url: data.url,
      meetingId: data.meetingId,
      socketId: socket.id,
    })
  });
}