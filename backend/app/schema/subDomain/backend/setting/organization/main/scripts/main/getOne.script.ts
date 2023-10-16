import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../../../collaborate/_singleton/preMain/socketLookUp.ram-cache";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";
import backendSettingOrganization from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";

type input = {
  socketId: string;
}

export default function getOne(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingOrganization'
    const settingsOrganizationSql = makeBackendSettingOrganizationSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await settingsOrganizationSql.getOne()

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
      const name: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.name || "test",
          name: "name"
        }),
        name: "name"
      }

      const addressLine1: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.addressLine1 || "",
          name: "addressLine1"
        }),
        name: "addressLine1"
      }

      const addressLine2: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.addressLine2 || "",
          name: "addressLine2"
        }),
        name: "addressLine2"
      }

      const cityLocality: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.cityLocality || "",
          name: "cityLocality"
        }),
        name: "cityLocality"
      }

      const stateProvinceRegion: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.stateProvinceRegion || "",
          name: "stateProvinceRegion"
        }),
        name: "stateProvinceRegion"
      }

      const postalCode: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.postalCode || "",
          name: "postalCode"
        }),
        name: "postalCode"
      }

      const socialFacebook: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialFacebook || "",
          name: "socialFacebook"
        }),
        name: "socialFacebook"
      }

      const socialX: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialX || "",
          name: "socialX"
        }),
        name: "socialX"
      }

      const socialInstagram: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialInstagram || "",
          name: "socialInstagram"
        }),
        name: "socialInstagram"
      }

      const socialLinkedIn: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialLinkedIn || "",
          name: "socialLinkedIn"
        }),
        name: "socialLinkedIn"
      }

      const socialYouTube: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialYouTube || "",
          name: "socialYouTube"
        }),
        name: "socialYouTube"
      }


      const socialPinterest: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialPinterest || "",
          name: "socialPinterest"
        }),
        name: "socialPinterest"
      }


      const socialWhatsapp: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialWhatsapp || "",
          name: "socialWhatsapp"
        }),
        name: "socialWhatsapp"
      }

      const socialReddit: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeYDocAdapter({
          initialText: record.data?.dataValues?.socialReddit || "",
          name: "socialReddit"
        }),
        name: "socialReddit"
      }






      const setEntity = await sameDoc.set({
        entity,
        properties: [
          name,
          addressLine1,
          addressLine2,
          cityLocality,
          stateProvinceRegion,
          postalCode,
          socialFacebook,
          socialX,
          socialInstagram,
          socialLinkedIn,
          socialYouTube,
          socialPinterest,
          socialWhatsapp,
          socialReddit,
        ],
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...record.data,
          ...setEntity.data,
          entity,
        }
      }
    }
  }
}