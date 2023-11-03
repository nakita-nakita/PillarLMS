import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocSwitch from "../../preMain/collaborateSameDocSwitch.ram-cache";

type input = {
  socket: any,
  d: dependencies
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
