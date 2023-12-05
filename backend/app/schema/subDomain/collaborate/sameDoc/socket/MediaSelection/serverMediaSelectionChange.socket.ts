import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocMediaSelection from "../../preMain/collaborateSameDocMediaSelection.ram-cache";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies,
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-media-selection-change', async ({
    entity,
    name,
    selection,
  }) => {
    
    const sameDocMedia = makeCollaborateSameDocMediaSelection(d)

    sameDocMedia.updateSelectionChange({
      entity,
      name,
      selection,
      socketId: socket.id,
    })
  });
}
