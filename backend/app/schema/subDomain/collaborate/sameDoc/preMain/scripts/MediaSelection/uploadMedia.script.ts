import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeMediaSelectionAdapter from "../../../forUsage/adapters/RealTimeMediaSelectionAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  media: string
}


export default function uploadMedia(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const prop: RealTimeMediaSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeMediaSelectionAdapter

    if (prop) {
      const orderNumber = await prop.uploadMedia({
        media: args.media,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          media: args.media,
          user: {
            displayName: user.data.displayName,
            circleColor: user.data.circleColor,
            labelColor: user.data.labelColor,
            picture: user.data.picture,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-upload-media-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-upload-media-change'
      })
    }

    return {
      success: true,
    }
  }
};
