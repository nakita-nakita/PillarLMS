import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { name: string }

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const data = await db.backendPermission.create(
      args,
      {
        transaction: subDomainTransaction,
        returning: true,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


