import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../../_singleton/preMain/_singleton.ram-cache";
import makeGetUsernameForSocket from "../../../_singleton/preMain/scripts/socketLookUp/getUsernameForSocket";
import makeCollaborateSameDocSwitch from "../../preMain/collaborateSameDocSwitch.ram-cache";
import makeCollaborateSameDocTextField from "../../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-switch-change', async ({
    entity,
    name,
    booleanValue,
  }) => {
    
    const sameDocTextField = makeCollaborateSameDocSwitch(d)

    sameDocTextField.updateSwitchChange({
      entity,
      name,
      booleanValue,
      socketId: socket.id,
    })
  });
}
