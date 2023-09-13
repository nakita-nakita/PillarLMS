import { Op } from "sequelize";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { idArray: string[] }

export default function areIdsValid({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async ({ idArray }: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction: domainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === idArray.length,
    }
  }
}


