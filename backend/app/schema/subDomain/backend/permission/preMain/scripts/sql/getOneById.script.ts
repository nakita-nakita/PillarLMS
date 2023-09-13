import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const data = await db.backendPermission.findOne({
      where,
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


