import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooter from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooter.model";

type input = {
  id?: string
  webAssetImport?: string
  menuJsonB?: string
  userAnswersJsonB?: string
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooter> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.backendSettingFooter.upsert(args, {
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
