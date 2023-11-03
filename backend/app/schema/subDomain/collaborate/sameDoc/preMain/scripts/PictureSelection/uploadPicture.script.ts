import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  picture: string
}


export default function uploadPicture(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    const prop: RealTimePictureSelectionAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimePictureSelectionAdapter

    if (prop) {
      const orderNumber = await prop.uploadPicture({
        picture: args.picture,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          picture: args.picture,
          user: {
            displayName: user.data.displayName,
            circleColor: user.data.circleColor,
            labelColor: user.data.labelColor,
            picture: user.data.picture,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-upload-picture-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-upload-picture-change'
      })
    }

    return {
      success: true,
    }
  }
};
