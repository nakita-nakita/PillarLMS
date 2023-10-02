import { Model } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { Op } from "sequelize";


export default function viewTrashed({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendMediaManagerFile>[]>> => {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // only show files that deleted within 30 days.
    const data: Model<backendMediaManagerFile>[] = await db.backendMediaManagerFile.findAll({
      where: {
        deletedAt: {
          [Op.gte]: thirtyDaysAgo
        },
      },
      paranoid: false,
      transaction: subDomainTransaction
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


