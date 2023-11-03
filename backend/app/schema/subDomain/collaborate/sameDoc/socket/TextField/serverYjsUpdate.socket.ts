



import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocTextField from "../../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: dependencies
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

