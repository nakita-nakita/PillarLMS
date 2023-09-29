import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeSamepage from "../../_singleton/preMain/whoIsOnPage.ram-cache";


type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('change-url', async (data) => {
    const samePage = makeSamepage(d)

    await samePage.changeUrlForUser({
      // userId: socket.userId,
      socketId: socket.id,
      currentAsPath: data.currentAsPath,
      currentPathname: data.currentPathname,
      oldAsPath: data.oldAsPath,
      oldPathname: data.oldPathname,
    })
  });
}