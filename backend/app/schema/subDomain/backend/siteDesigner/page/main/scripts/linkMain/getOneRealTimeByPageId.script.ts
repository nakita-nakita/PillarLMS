import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimePictureSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimePictureSelectionAdapter";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import makeBackendSiteDesignerPageLinkSql from "../../../preMain/backendSiteDesignerPageLink.sql";
import RealTimeMediaSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeMediaSelectionAdapter";

type input = {
  socketId: string;
  pageId: string;
}

export default function getOneRealTimeByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSiteDesignerPageLink'
    const sql = makeBackendSiteDesignerPageLinkSql(d);

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
      const title: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.title || "",
          name: "title"
        }),
        name: "title"
      }
      
      const description: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.description || "",
          name: "description"
        }),
        name: "description"
      }

      const picture: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeMediaSelectionAdapter({
          media: record.data?.dataValues?.picture,
          // initialText: record.data?.dataValues?.description || "",
          name: "picture"
        }),
        name: "picture"
      }
      const setEntity = await sameDoc.set({
        entity,
        properties: [
          title,
          description,
          picture,
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