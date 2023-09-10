import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../../models/subDomain/backend/user/backendUserManyPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
}

export default function getAll({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[]>> => {

    const data = await db.backendUserManyPermission.findAll({
      where: {
        userId: args.id,
      },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data,
    }
  }
}