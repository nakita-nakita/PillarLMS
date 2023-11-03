import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { Op } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string 
}

export default function getOneById(d: dependencies) {

  const db = d.subDomainDb.models;

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
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


