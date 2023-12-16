import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import makeBackendSiteDesignerPageSectionNormalSql from "../../../preMain/backendSiteDesignerPageSectionNormal.sql";

type input = {
  socketId: string;
  sectionId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = `backendSiteDesignerPageSectionNormal_${args.sectionId}`

    const normalSql = makeBackendSiteDesignerPageSectionNormalSql(d)
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await normalSql.getOneById({
      id: args.sectionId
    })
    
    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    if (doesEntityExist.result) {
      //get
      const entityRecord = await sameDoc.getByEntity({
        entity,
      })

      const {menu, props, answers, nonRealTimeProps} = entityRecord.data.getData()

      if (args.socketId) {
        await sameDoc.userConnectsToEntity({
          entity,
          socketId: args.socketId,
        })
      }

      const menuObj = {...menu}
      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...props,
          ...nonRealTimeProps,
          menuJsonB: menuObj ? JSON.stringify(menuObj) : null,
          userAnswersJsonB: Object.keys(answers).length ? JSON.stringify(answers): null,
          entity,
        }
      }

    } else {

      const setVariables = await sameDoc.adaptersFromMenuAndAnswers({
        menu: record.data?.dataValues?.menuJsonB,
        userAnswers: record.data?.dataValues?.userAnswersJsonB,
      })

      const isReady: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: record.data?.dataValues?.isReady || false,
          name: "isReady"
        }),
        name: "isReady"
      }

      const setEntity = await sameDoc.set({
        entity,
        properties: [...setVariables.data?.adapters, isReady],
        menu: setVariables.data?.menu,
        socketId: args.socketId,
        nonRealTimeProps: {
          webAssetImport: record.data?.dataValues?.webAssetImport,
          selectionType: record.data?.dataValues?.selectionType,
          selectionId: record.data?.dataValues?.selectionId,
        }
      })

      const {menu, props, answers, nonRealTimeProps} = setEntity.data.getData()

      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...nonRealTimeProps,
          ...props,
          menuJsonB: menu ? JSON.stringify({...menu}) : null,
          userAnswersJsonB: Object.keys(answers).length ? JSON.stringify(answers): null,
          entity,
        }
      }
    }
  }
}