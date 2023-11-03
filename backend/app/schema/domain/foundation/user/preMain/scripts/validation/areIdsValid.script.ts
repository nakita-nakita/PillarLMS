import { Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { idArray: string[] }

export default function areIdsValid(d: dependencies) {

  const db = d.domainDb.models;

  return async ({ idArray }: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where: {
        id: {
          [Op.in]: idArray
        }
      },
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data === idArray.length,
    }
  }
}


