import { Op } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { idArray: string[] }

export default function areIdsValid({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ idArray }: input): Promise<returningSuccessObj<null>> => {

    const data = await db.backendUser.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === idArray.length
    }
  }
}


