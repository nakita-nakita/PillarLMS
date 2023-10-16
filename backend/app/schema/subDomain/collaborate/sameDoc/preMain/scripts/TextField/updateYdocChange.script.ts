import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";


type input = {
  entity: string,
  name: string,
  ydoc: any,
  socketId: string
}

export default function updateYdocChange(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)

    const prop = await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })

    const data = {
      order: undefined,
      entity: args.entity,
      name: args.name,
      ydoc: args.ydoc,
    }

    try {
      data.order = await prop.data.applyYdocUpdate(args.ydoc)
    }
    catch (ex) {
      return {
        success: false,
      }
    }

    await sameDocEntity.broadcast({
      data,
      entity: args.entity,
      socketId: args.socketId,
      socketChannel: 'samedoc-yjs-update',
    })



    return {
      success: true,
    }
  }
}

