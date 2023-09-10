import { Op } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";

type input = { idArray: string[] }

export default function areIdsValid({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ idArray }: input) => {

    const data: number = await db.backendSiteDesignerSetting_settingAccess.count({
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


