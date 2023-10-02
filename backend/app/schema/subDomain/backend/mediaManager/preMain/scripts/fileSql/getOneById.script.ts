import { Model } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { Op } from "sequelize";

type input = { 
  id: string 
}

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // only show files that are not deleted or deleted within 30 days.
    const data = await db.backendMediaManagerFile.findOne({
      where: {
        ...where,
        [Op.or]: [
          { deletedAt: null },
          { deletedAt: { [Op.gte]: thirtyDaysAgo } }
        ]
      }, 
      paranoid: false,
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


