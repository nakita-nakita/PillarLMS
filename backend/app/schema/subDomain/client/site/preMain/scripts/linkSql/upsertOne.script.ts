import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteLink from "../../../../../../../models/subDomain/client/site/clientSiteLink.model";

type input = {
  id?: string
  title?: string
  description?: string
  image?: string
}

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSiteLink> | null>> => {
    
    // Use upsert instead of separate create or update
    const [instance, created] = await db.clientSiteLink.upsert(args, {
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
