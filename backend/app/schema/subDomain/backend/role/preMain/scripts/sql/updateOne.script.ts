import { Model } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string, name: string }

export default function updateOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id, name }: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const data = await db.backendRole.update(
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


