import { Op } from "sequelize";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { idArray: string[] }

export default function areIdsValid({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async ({ idArray }: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === idArray.length,
    }
  }
}


