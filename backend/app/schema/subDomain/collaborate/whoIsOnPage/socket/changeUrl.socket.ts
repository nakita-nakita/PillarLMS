import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeWhoIsOnPage from "../../_singleton/preMain/whoIsOnPage.ram-cache";


type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-change-url', async (data) => {
    const whoIsOnPage = makeWhoIsOnPage(d)

    await whoIsOnPage.changeUrlForUser({
      // userId: socket.userId,
      socketId: socket.id,
      currentAsPath: data.currentAsPath,
      currentPathname: data.currentPathname,
      oldAsPath: data.oldAsPath,
      oldPathname: data.oldPathname,
    })
  });
}