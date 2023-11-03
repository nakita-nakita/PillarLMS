import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  folderId?: string
}

export default function getMany(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile>[]>> => {

    const data: Model<backendMediaManagerFile>[] = await db.backendMediaManagerFile.findAll({
      where: {
        folderId: args.folderId || null,
        deletedAt: null,
      },
      transaction: d.subDomainTransaction
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


