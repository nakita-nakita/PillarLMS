import { Model } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { name: string }

export default function addOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ name }: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const data = await db.backendRole.create(
      {
        name,
      },
      {
        transaction: d.subDomainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


