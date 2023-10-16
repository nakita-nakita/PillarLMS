import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  range: any
}


export default function updateSelectionChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const selectionCursor = {
      order: undefined,
      range: args.range,
      userColor: user.data.circleColor,
      username: user.data.displayName,
      userId: user.data.userId,
      name: args.name,
      entity: args.entity,
    }

    const prop = await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })


    if (prop.data) {
      if (args.range) {
        selectionCursor.order = await prop.data.addOrUpdateSelection(selectionCursor)
      } else {
        selectionCursor.order = await prop.data.removeSelection(user.data.userId)
      }
    }

    await sameDocEntity.broadcast({
      data: selectionCursor,
      entity: args.entity,
      socketChannel: 'samedoc-selection-change',
      socketId: args.socketId,
      socketBufferChannel: 'samedoc-buffer-selection-change'
    })

    return {
      success: true,
    }

  }
};
