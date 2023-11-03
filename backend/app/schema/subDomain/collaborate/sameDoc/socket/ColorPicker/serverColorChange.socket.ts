import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocColorPicker from "../../preMain/collaborateSameDocColorPicker.ram-cache";

type input = {
  socket: any,
  d: dependencies
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
