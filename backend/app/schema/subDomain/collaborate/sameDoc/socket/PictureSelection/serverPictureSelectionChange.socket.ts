import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../../_singleton/preMain/_singleton.ram-cache";
import makeGetUsernameForSocket from "../../../_singleton/preMain/scripts/socketLookUp/getUsernameForSocket";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";
import makeCollaborateSameDocSwitch from "../../preMain/collaborateSameDocSwitch.ram-cache";
import makeCollaborateSameDocTextField from "../../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: d_allDomain
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
