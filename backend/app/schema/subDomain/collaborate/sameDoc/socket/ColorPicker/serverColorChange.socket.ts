import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../../_singleton/preMain/_singleton.ram-cache";
import makeGetUsernameForSocket from "../../../_singleton/preMain/scripts/socketLookUp/getUsernameForSocket";
import makeCollaborateSameDocColorPicker from "../../preMain/collaborateSameDocColorPicker.ram-cache";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";
import makeCollaborateSameDocSwitch from "../../preMain/collaborateSameDocSwitch.ram-cache";
import makeCollaborateSameDocTextField from "../../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-color-picker-change', async ({
    entity,
    name,
    color,
  }) => {
    
    const sameDocColorPicker = makeCollaborateSameDocColorPicker(d)

    sameDocColorPicker.updateColorChange({
      entity,
      name,
      color,
      socketId: socket.id,
    })
  });
}
