import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-start', async (data) => {
    const meeting = makeMeeting(d)

    const result = await meeting.start({
      name: data.name,
      url: data.url,
      socketId: socket.id,
    })

    socket.emit('meeting-start', {
      id: result.data.id
    })
  });
}