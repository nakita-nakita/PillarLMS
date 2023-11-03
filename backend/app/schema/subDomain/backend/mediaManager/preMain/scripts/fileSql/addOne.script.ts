import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  userFileName: string
  systemFileName: string
  url: string
  folderId?: string,
  uploadedBy: string
}

export default function addOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const data = await db.backendMediaManagerFile.create(
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


