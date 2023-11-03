import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import RealTimePictureSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimePictureSelectionAdapter";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";
import RealTimeFaviconSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  socketId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingSite'
    const settingsSiteSql = makeBackendSettingSiteSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await settingsSiteSql.getOne()

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
      const favicon: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeFaviconSelectionAdapter({
          favicon: record.data?.dataValues?.favicon,
          name: "favicon"
        }),
        name: "favicon"
      }

      //adapter for every realtime property
      const tab: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.tab || "",
          name: "tab"
        }),
        name: "tab"
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
          favicon,
          tab,
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