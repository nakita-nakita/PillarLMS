import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingOrganization from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string,
  logo?: string,
  name?: string,
  shouldApplyToTopNavMenu?: boolean,
  addressLine1?: string,
  addressLine2?: string,
  cityLocality?: string,
  stateProvinceRegion?: string,
  postalCode?: string,
  socialFacebook?: string,
  socialX?: string,
  socialInstagram?: string,
  socialLinkedIn?: string,
  socialYouTube?: string,
  socialPinterest?: string,
  socialWhatsapp?: string,
  socialReddit?: string,
}

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.backendSettingOrganization.upsert(args, {
      returning: true,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    // `created` is a boolean indicating whether a new instance was created
    // `instance` is the model instance itself
    if (created) {
      // New instance created
      return {
        success: true,
        data: instance,
      }
    } else {
      // Existing instance updated
      return {
        success: true,
        data: instance,
      }
    }
  }
}
