import { Model } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { Op } from "sequelize";

type input = {
  folderId?: string
}

export default function getMany({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile>[]>> => {

    const data: Model<backendMediaManagerFile>[] = await db.backendMediaManagerFile.findAll({
      where: {
        folderId: args.folderId || null,
        deletedAt: null,
      },
      transaction: subDomainTransaction
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


