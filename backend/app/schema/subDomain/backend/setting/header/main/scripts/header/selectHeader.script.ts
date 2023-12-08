import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import makeBackendSettingHeaderSql from "../../../preMain/backendSettingHeader.sql";
import makeBackendSettingHeaderBuiltInMain from "../../backendSettingHeaderBuiltIn.main";

enum SelectionTypeEnum {
  BUILT_IN = "BUILT_IN",
  PLUGIN = "PLUGIN",
  MARKET = "MARKET",
}

type input = {
  socketId: string;
  id: string;
  type: SelectionTypeEnum;
}

export default function selectHeader(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingHeader'

    const settingHeaderSql = makeBackendSettingHeaderSql(d)
    const sameDoc = makeCollaborateSameDoc(d)

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    if (doesEntityExist.result) {
      //get
      const entityRecord = await sameDoc.getByEntity({
        entity,
      })

      switch (args.type) {
        case "BUILT_IN":

          const settingHeaderBuiltInMain = makeBackendSettingHeaderBuiltInMain(d)

          const builtInRecords = await settingHeaderBuiltInMain.getMany()
          
          const builtInRecord = builtInRecords.data.filter(r => r.dataValues.id === args.id)

          await entityRecord.data.updateMenu({
            menu: builtInRecord[0].dataValues.menuJsonB,
            nonRealTimeProps:{
              webAssetImport: builtInRecord[0].dataValues.webAssetImport,
              selectionType: "BUILT_IN",
              selectionId: builtInRecord[0].dataValues.id,
            }
          })


          break;
        case "PLUGIN":
          // not implemented
          break;
        case "MARKET":
          // not implemented
          break;

      }


      const { menu, props, answers, nonRealTimeProps } = entityRecord.data.getData()

      if (args.socketId) {
        entityRecord.data.sockets.map(s => {
          if (s.socketId !== args.socketId) {
            s.socket.emit("samedoc-header-selection-change")
          }
        })
      }

      const menuObj = { ...menu }
      return {
        success: true,
        data: {
          ...props,
          ...(nonRealTimeProps || {}),
          menuJsonB: menuObj ? JSON.stringify(menuObj) : null,
          userAnswersJsonB: Object.keys(answers).length ? JSON.stringify(answers) : null,
          entity,
        }
      }

    }
    // else {

    //   const setVariables = await sameDoc.adaptersFromMenuAndAnswers({
    //     menu: record.data?.dataValues?.menuJsonB,
    //     userAnswers: record.data?.dataValues?.userAnswersJsonB,
    //   })

    //   const isReady: RealTimeAdapterPropertyValue = {
    //     adapter: new RealTimeSwitchAdapter({
    //       initialBoolean: record.data?.dataValues?.isReady || false,
    //       name: "isReady"
    //     }),
    //     name: "isReady"
    //   }

    //   const setEntity = await sameDoc.set({
    //     entity,
    //     properties: [...setVariables.data?.adapters, isReady],
    //     menu: setVariables.data?.menu,
    //     socketId: args.socketId,
    //   })

    //   const {menu, props, answers} = setEntity.data.getData()

    //   return {
    //     success: true,
    //     data: {
    //       ...record.data?.dataValues,
    //       ...props,
    //       menuJsonB: menu ? JSON.stringify({...menu}) : null,
    //       userAnswersJsonB: Object.keys(answers).length ? JSON.stringify(answers): null,
    //       entity,
    //     }
    //   }
    // }
  }
}