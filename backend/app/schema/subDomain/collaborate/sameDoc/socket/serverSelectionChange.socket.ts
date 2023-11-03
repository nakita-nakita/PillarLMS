import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocTextField from "../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: dependencies
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
