import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { Op } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


export default function viewTrashed(d: dependencies) {

  const db = d.subDomainDb.models;

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
      transaction: d.subDomainTransaction
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


