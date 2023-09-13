import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string
  roleId: string
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole> | null>> => {

    const data = await db.backendUserManyRole.create(
      args,
      {
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


