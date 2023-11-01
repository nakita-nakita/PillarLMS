import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  favicon: string
}


export default function uploadFavicon(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const prop: RealTimeFaviconSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeFaviconSelectionAdapter

    if (prop) {
      const orderNumber = await prop.uploadFavicon({
        favicon: args.favicon,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          favicon: args.favicon,
          user: {
            displayName: user.data.displayName,
            circleColor: user.data.circleColor,
            labelColor: user.data.labelColor,
            picture: user.data.picture,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-upload-favicon-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-upload-favicon-change'
      })
    }

    return {
      success: true,
    }
  }
};
