import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: d_allDomain
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