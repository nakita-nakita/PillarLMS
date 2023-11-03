import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  roleId: string
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyRole> | null>> => {

    const data = await db.backendUserManyRole.create(
      args,
      {
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


