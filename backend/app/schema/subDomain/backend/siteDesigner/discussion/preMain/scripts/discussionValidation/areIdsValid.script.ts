import { Op } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";

type input = { 
  idArray: string[] 
}

export default function areIdsValid({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ idArray }: input) => {

    const data = await db.backendSiteDesignerDiscussion.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === idArray.length
    }
  }
}


