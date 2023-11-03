import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import { EntityDocument, SameDoc } from "../../../forUsage/types/RealTimeEntity";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export type RealTimeAdapterPropertyValue = {
  name: string,
  adapter: RealTimeYDocAdapter | RealTimeSwitchAdapter | RealTimePictureSelectionAdapter | RealTimeColorAdapter | RealTimeFaviconSelectionAdapter
}

type input = {
  socketId: string
  entity: string,
  properties: any[]
}

export default function set(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {

    const singletonFunc = makeSingleton(d)
    const lookUp = makeSocketLookUp(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    // main working area
    const sameDoc: SameDoc = singleton.data.sameDoc
    sameDoc[args.entity] = sameDoc[args.entity] || {};

    //add socket to entity
    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })

    // so we can remove it on socket disconnect.
    user.data.entities.push(args.entity)

    sameDoc[args.entity].sockets = sameDoc[args.entity].sockets || []
    sameDoc[args.entity].sockets.push(user.data)


    //add properties
    for (let i = 0; i < args.properties.length; i++) {
      const prop = args.properties[i];

      sameDoc[args.entity][prop.name] = prop.adapter
    }

    // manager sockets for this record.
    sameDoc[args.entity].addSocket = async ({ socketId }) => {

      //add socket to entity
      const newUser = await lookUp.getLookUpBySocketId({
        socketId,
      })

      sameDoc[args.entity].sockets.push(newUser.data)

    }

    sameDoc[args.entity].removeSocket = async ({ socketId }) => {

      for (let i = 0; i < sameDoc[args.entity].sockets.length; i++) {
        const socket = sameDoc[args.entity].sockets[i];
      
        if(socket.socketId === socketId) {
          sameDoc[args.entity].sockets.splice(i, 1)

          break;
        }
      }

      // if no one is watching the entity, the entity delete itself for a fresh instance the next time the feature is opened.
      if (sameDoc[args.entity].sockets.length === 0) {
        delete sameDoc[args.entity]
      }
    }

    return {
      success: true,
      data: sameDoc[args.entity],
    }
  }
}


