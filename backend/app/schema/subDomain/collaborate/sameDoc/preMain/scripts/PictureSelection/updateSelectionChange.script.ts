import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  selection: string
}


export default function updateSelectionChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)

    const prop: RealTimePictureSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimePictureSelectionAdapter

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
        socketChannel: 'samedoc-picture-selection-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-picture-selection-change'
      })
    }

    return {
      success: true,
    }
  }
};
