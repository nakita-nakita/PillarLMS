import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-picture-selection-change', async ({
    entity,
    name,
    selection,
  }) => {
    
    const sameDocTextField = makeCollaborateSameDocPictureSelection(d)

    sameDocTextField.updateSelectionChange({
      entity,
      name,
      selection,
      socketId: socket.id,
    })
  });
}
