import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string, name: string }

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ id, name }: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const data = await db.backendPermission.update(
      { name, },
      {
        where: { id, },
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


