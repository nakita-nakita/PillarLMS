import { Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function areEmailsTaken(d: dependencies) {

  const db = d.domainDb.models;

  return async (emailArray: string[]): Promise<returningSuccessObj<null>> => {

    const data: number = await db.foundationUser.count({
      where: {
        email: {
          [Op.in]: emailArray
        }
      },
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0
    }
  }
}