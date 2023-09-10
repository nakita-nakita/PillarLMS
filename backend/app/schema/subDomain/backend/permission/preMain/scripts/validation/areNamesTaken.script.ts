import { Op } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { nameArray: string[] }

export default function areNamesTaken({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ nameArray }: input): Promise<returningSuccessObj<null>> => {

    const data: number = await db.backendPermission.count({
      where: {
        name: {
          [Op.in]: nameArray
        }
      },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      // result: data !== 0
      result: data === nameArray.length,
    }
  }
}