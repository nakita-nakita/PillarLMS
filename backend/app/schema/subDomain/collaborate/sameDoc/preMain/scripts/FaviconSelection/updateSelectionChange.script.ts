import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
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

    const prop: RealTimeFaviconSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeFaviconSelectionAdapter

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
        socketChannel: 'samedoc-favicon-selection-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-favicon-selection-change'
      })
    }

    return {
      success: true,
    }
  }
};
