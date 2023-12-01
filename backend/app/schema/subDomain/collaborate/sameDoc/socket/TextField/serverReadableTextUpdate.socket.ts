



import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocTextField from "../../preMain/collaborateSameDocTextField.cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-textfield-readable-text-update', async ({
    entity,
    name,
    readableTextValue
  }) => {

    const sameDocTextField = makeCollaborateSameDocTextField(d)

    sameDocTextField.updateReadableTextValueChange({
      entity,
      name,
      readableTextValue,
      socketId: socket.id,
    })
  });
}

