import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import RealTimePictureSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimePictureSelectionAdapter";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  socketId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingLink'
    const settingsLinkSql = makeBackendSettingLinkSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await settingsLinkSql.getOne()

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    if (doesEntityExist.result) {
      //get
      const entityRecord = await sameDoc.getByEntity({
        entity,
      })

      await sameDoc.userConnectsToEntity({
        entity,
        socketId: args.socketId,
      })

      // // add subscription to user viewing entity
      // entityRecord.data.addSocket({
      //   socketId: args.socketId
      // })


      return {
        success: true,
        data: {
          ...record.data,
          ...entityRecord.data,
          entity,
        }
      }

    } else {
      //adapter for every realtime property
      const image: RealTimeAdapterPropertyValue = {
        adapter: new RealTimePictureSelectionAdapter({
          picture: record.data?.dataValues?.image,
          name: "image"
        }),
        name: "image"
      }
      //adapter for every realtime property
      const title: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.title || "",
          name: "title"
        }),
        name: "title"
      }

      //adapter for every realtime property
      const description: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.description || "",
          name: "description"
        }),
        name: "description"
      }

      const isReady: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: record.data?.dataValues?.isReady || false,
          name: "isReady"
        }),
        name: "isReady"
      }





      const setEntity = await sameDoc.set({
        entity,
        properties: [
            image,
            title,
            description,
            isReady,
        ],
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...setEntity.data,
          entity,
        }
      }
    }
  }
}