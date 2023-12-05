import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocMediaSelection from "../../preMain/collaborateSameDocMediaSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies,
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-update-media', async ({
    entity,
    name,
    media,
  }) => {
    
    const sameDocMedia = makeCollaborateSameDocMediaSelection(d)

    sameDocMedia.uploadMedia({
      entity,
      name,
      media,
      socketId: socket.id,
    })
  });
}
