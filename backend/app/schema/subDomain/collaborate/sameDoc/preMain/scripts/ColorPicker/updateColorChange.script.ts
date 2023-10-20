import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  color: string
}


export default function updateColorChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const prop: RealTimeColorAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeColorAdapter

    if (prop) {
      const orderNumber = await prop.updateColor({
        color: args.color,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          color: args.color,
          user: {
            picture: user.data.picture,
            displayName: user.data.displayName,
            labelColor: user.data.labelColor,
            circleColor: user.data.circleColor,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-color-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-color-change'
      })
    }

    return {
      success: true,
    }
  }
};
