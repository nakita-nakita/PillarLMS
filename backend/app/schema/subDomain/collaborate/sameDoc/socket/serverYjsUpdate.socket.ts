



import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeSingleton from "../../_singleton/preMain/_singleton.ram-cache";
import makeCollaborateSameDocTextField from "../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: d_allDomain
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-yjs-update', async ({
    entity,
    name,
    ydoc
  }) => {

    
    const sameDocTextField = makeCollaborateSameDocTextField(d)

    sameDocTextField.updateYdocChange({
      entity,
      name,
      ydoc,
      socketId: socket.id,

    })
  });
}

