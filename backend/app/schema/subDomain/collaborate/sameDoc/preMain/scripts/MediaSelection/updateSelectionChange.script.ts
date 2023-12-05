import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import RealTimeMediaSelectionAdapter from "../../../forUsage/adapters/RealTimeMediaSelectionAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  selection: string
}


export default function updateSelectionChange(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)

    const prop: RealTimeMediaSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeMediaSelectionAdapter

    if (prop) {
      const orderNumber = await prop.updateSelection({
        selection: args.selection,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          selection: args.selection,
        },
        entity: args.entity,
        socketChannel: 'samedoc-media-selection-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-media-selection-change'
      })
    }

    return {
      success: true,
    }
  }
};
