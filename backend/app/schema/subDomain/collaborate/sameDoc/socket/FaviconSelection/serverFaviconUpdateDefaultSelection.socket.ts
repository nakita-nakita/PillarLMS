import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types"
import makeCollaborateSameDocFaviconSelection from "../../preMain/collaborateSameDocFaviconSelection.ram-cache";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";

type input = {
  socket: any,
  d: d_allDomain
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
