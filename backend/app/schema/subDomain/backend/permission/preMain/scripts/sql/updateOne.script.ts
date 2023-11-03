import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string, name: string }

export default function updateOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id, name }: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const data = await db.backendPermission.update(
      { name, },
      {
        where: { id, },
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


