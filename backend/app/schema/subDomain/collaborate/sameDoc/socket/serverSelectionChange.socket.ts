import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../_singleton/preMain/_singleton.ram-cache";
import makeGetUsernameForSocket from "../../_singleton/preMain/scripts/socketLookUp/getUsernameForSocket";
import makeCollaborateSameDocTextField from "../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-selection-change', async ({
    entity,
    name,
    range,
  }) => {

    const sameDocTextField = makeCollaborateSameDocTextField(d)

    sameDocTextField.updateSelectionChange({
      entity,
      name,
      range,
      socketId: socket.id,
    })
  });
}
