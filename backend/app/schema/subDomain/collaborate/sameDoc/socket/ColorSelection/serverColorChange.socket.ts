import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocColorSelection from "../../preMain/collaborateSameDocColorSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-color-selection-change', async ({
    entity,
    name,
    color,
  }) => {
    
    const sameDocColorPicker = makeCollaborateSameDocColorSelection(d)

    sameDocColorPicker.updateColorChange({
      entity,
      name,
      color: color.color,
      suggestedTextColor: color.suggestedTextColor,
      socketId: socket.id,
    })
  });
}
