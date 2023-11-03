import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocFaviconSelection from "../../preMain/collaborateSameDocFaviconSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies,
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-update-favicon', async ({
    entity,
    name,
    favicon,
  }) => {
    
    const sameDocFavicon = makeCollaborateSameDocFaviconSelection(d)

    sameDocFavicon.uploadFavicon({
      entity,
      name,
      favicon,
      socketId: socket.id,
    })
  });
}
