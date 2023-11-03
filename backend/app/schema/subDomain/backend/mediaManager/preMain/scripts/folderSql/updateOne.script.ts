import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string, 
  name?: string,
  folderId?: string, 
}

export default function updateOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const data = await db.backendMediaManagerFolder.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


