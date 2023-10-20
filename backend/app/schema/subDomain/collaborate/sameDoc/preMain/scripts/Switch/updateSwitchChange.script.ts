import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  booleanValue: any
}


export default function updateSwitchChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })


    const prop: RealTimeSwitchAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeSwitchAdapter

    if (prop) {
      const orderNumber = await prop.updateSwitch({
        booleanValue: args.booleanValue,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          booleanValue: args.booleanValue,
          user: {
            picture: user.data.picture,
            displayName: user.data.displayName,
            labelColor: user.data.labelColor,
            circleColor: user.data.circleColor,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-switch-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-switch-change'
      })
    }

    return {
      success: true,
    }

  }
};
