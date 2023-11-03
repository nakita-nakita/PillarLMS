import { Op } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { idArray: string[] }

export default function areIdsValid(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ idArray }: input) => {

    const data = await db.backendNotification.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === idArray.length
    }
  }
}


