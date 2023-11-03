import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getAll(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole>[]>> => {

    const data = await db.backendUserManyRole.findAll({
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