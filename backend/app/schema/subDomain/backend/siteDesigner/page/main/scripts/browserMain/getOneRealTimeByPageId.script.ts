import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimePictureSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimePictureSelectionAdapter";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageBrowserSql from "../../../preMain/backendSiteDesignerPageBrowser.sql";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";

type input = {
  socketId: string;
  pageId: string;
}

export default function getOneRealTimeByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSiteDesignerPageBrowser'
    const sql = makeBackendSiteDesignerPageBrowserSql(d);

    const sameDoc = makeCollaborateSameDoc(d)

    const record = await sql.getOneByPageId({
      pageId: args.pageId,
    })

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
          ...entityRecord.data.props,
          entity,
        }
      }

    } else {
      //adapter for every realtime property
      const tabName: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.tabName || "",
          name: "tabName"
        }),
        name: "tabName"
      }

      const setEntity = await sameDoc.set({
        entity,
        properties: [
          tabName,
        ],
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...setEntity.data.props,
          entity,
        }
      }
    }
  }
}