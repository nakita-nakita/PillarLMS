import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../../models/subDomain/backend/user/backendUserManyPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getAll(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission>[]>> => {

    const data = await db.backendUserManyPermission.findAll({
      where: {
        userId: args.id,
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data,
    }
  }
}