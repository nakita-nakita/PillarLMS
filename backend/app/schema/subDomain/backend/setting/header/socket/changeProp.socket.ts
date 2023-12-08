import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDoc from "../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-setting-header-change-prop', async (data) => {

    const entity = 'backendSettingHeader'

    const sameDoc = makeCollaborateSameDoc(d)

    const record = await sameDoc.getByEntity({
      entity,
    })

    if (record.data) {
      record.data.updateUserAnswer({
        name: data.name,
        value: data.value,
      })
    }

    if (record.data.sockets) {
      record.data.sockets.map(s => {
        s.socket.emit("setting-header-change-prop", {
          entity,
          name: data.name,
          value: data.value,
        })
      })
    }
  });
}