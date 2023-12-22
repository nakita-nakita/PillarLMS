import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import clientSiteFooter from "../../../../../../../models/subDomain/client/site/clientSiteFooter.model";
import { sameDocMenuType } from "../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script";

type input = {
  id?: string
  webAssetImport?: string
  userAnswersJsonB?: string
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSiteFooter> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.clientSiteFooter.upsert(args, {
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
