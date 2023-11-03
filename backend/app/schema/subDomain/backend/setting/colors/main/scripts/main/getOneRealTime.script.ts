import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import makeBackendSettingColorsSql from "../../../preMain/backendSettingColors.sql";
import RealTimeColorAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeColorPickerAdapter";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  socketId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingColors'
    const settingsColorsSql = makeBackendSettingColorsSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await settingsColorsSql.getOne()

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
      const color1: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color1",
          color: record.data?.dataValues?.color1,
          colorLight1: record.data?.dataValues?.color1Light1,
          colorLight2: record.data?.dataValues?.color1Light2,
          colorLight3: record.data?.dataValues?.color1Light3,
          colorLight4: record.data?.dataValues?.color1Light4,
          colorDark1: record.data?.dataValues?.color1Dark1,
          colorDark2: record.data?.dataValues?.color1Dark2,
          colorDark3: record.data?.dataValues?.color1Dark3,
          colorDark4: record.data?.dataValues?.color1Dark4,
        }),
        name: "color1"
      }
      //adapter for every realtime property
      const color2: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color2",
          color: record.data?.dataValues?.color2,
          colorLight1: record.data?.dataValues?.color2Light1,
          colorLight2: record.data?.dataValues?.color2Light2,
          colorLight3: record.data?.dataValues?.color2Light3,
          colorLight4: record.data?.dataValues?.color2Light4,
          colorDark1: record.data?.dataValues?.color2Dark1,
          colorDark2: record.data?.dataValues?.color2Dark2,
          colorDark3: record.data?.dataValues?.color2Dark3,
          colorDark4: record.data?.dataValues?.color2Dark4,
        }),
        name: "color2"
      }
      //adapter for every realtime property
      const color3: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color3",
          color: record.data?.dataValues?.color3,
          colorLight1: record.data?.dataValues?.color3Light1,
          colorLight2: record.data?.dataValues?.color3Light2,
          colorLight3: record.data?.dataValues?.color3Light3,
          colorLight4: record.data?.dataValues?.color3Light4,
          colorDark1: record.data?.dataValues?.color3Dark1,
          colorDark2: record.data?.dataValues?.color3Dark2,
          colorDark3: record.data?.dataValues?.color3Dark3,
          colorDark4: record.data?.dataValues?.color3Dark4,
        }),
        name: "color3"
      }
      //adapter for every realtime property
      const color4: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color4",
          color: record.data?.dataValues?.color4,
          colorLight1: record.data?.dataValues?.color4Light1,
          colorLight2: record.data?.dataValues?.color4Light2,
          colorLight3: record.data?.dataValues?.color4Light3,
          colorLight4: record.data?.dataValues?.color4Light4,
          colorDark1: record.data?.dataValues?.color4Dark1,
          colorDark2: record.data?.dataValues?.color4Dark2,
          colorDark3: record.data?.dataValues?.color4Dark3,
          colorDark4: record.data?.dataValues?.color4Dark4,
        }),
        name: "color4"
      }
      //adapter for every realtime property
      const color5: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color5",
          color: record.data?.dataValues?.color5,
          colorLight1: record.data?.dataValues?.color5Light1,
          colorLight2: record.data?.dataValues?.color5Light2,
          colorLight3: record.data?.dataValues?.color5Light3,
          colorLight4: record.data?.dataValues?.color5Light4,
          colorDark1: record.data?.dataValues?.color5Dark1,
          colorDark2: record.data?.dataValues?.color5Dark2,
          colorDark3: record.data?.dataValues?.color5Dark3,
          colorDark4: record.data?.dataValues?.color5Dark4,
        }),
        name: "color5"
      }
      //adapter for every realtime property
      const color6: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color6",
          color: record.data?.dataValues?.color6,
          colorLight1: record.data?.dataValues?.color6Light1,
          colorLight2: record.data?.dataValues?.color6Light2,
          colorLight3: record.data?.dataValues?.color6Light3,
          colorLight4: record.data?.dataValues?.color6Light4,
          colorDark1: record.data?.dataValues?.color6Dark1,
          colorDark2: record.data?.dataValues?.color6Dark2,
          colorDark3: record.data?.dataValues?.color6Dark3,
          colorDark4: record.data?.dataValues?.color6Dark4,
        }),
        name: "color6"
      }
      //adapter for every realtime property
      const color7: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorAdapter({
          name: "color7",
          color: record.data?.dataValues?.color7,
          colorLight1: record.data?.dataValues?.color7Light1,
          colorLight2: record.data?.dataValues?.color7Light2,
          colorLight3: record.data?.dataValues?.color7Light3,
          colorLight4: record.data?.dataValues?.color7Light4,
          colorDark1: record.data?.dataValues?.color7Dark1,
          colorDark2: record.data?.dataValues?.color7Dark2,
          colorDark3: record.data?.dataValues?.color7Dark3,
          colorDark4: record.data?.dataValues?.color7Dark4,
        }),
        name: "color7"
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
          color1,
          color2,
          color3,
          color4,
          color5,
          color6,
          color7,
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