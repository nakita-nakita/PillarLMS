import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  name: string 
  createdBy: string
  folderId?: string
}

export default function addOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const data = await db.backendMediaManagerFolder.create(
      args,
      {
        transaction: d.subDomainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


