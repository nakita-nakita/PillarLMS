import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDoc from "../../preMain/collaborateSameDoc.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-unsub-entity', async ({
    entity,
  }) => {
    const sameDoc = makeCollaborateSameDoc(d)

    // if null , treat like a socket disconnect. The user is on a non-entity page.
    if (!entity) {
      
      await sameDoc.socketDisconnect_removeFromEntities({
        socketId: socket.id,
      })

      return;
    }

    // if entity name, run unsub user.
    await sameDoc.userDisconnectsFromEntity({
      entity,
      socketId: socket.id,
    })
  });
}
