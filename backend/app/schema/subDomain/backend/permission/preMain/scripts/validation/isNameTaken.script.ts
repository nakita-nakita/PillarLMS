import { Op, Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript"
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = { name: string }

export default function isNameTaken({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ name }: input) => {

    const data = await db.backendPermission.count({
      where: {
        name,
      },
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      result: data === 1,
    }
  }
}


