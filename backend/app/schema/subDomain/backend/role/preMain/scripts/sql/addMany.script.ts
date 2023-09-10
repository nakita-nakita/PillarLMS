import { Model } from "sequelize";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type roleNamesArrayObjectType = {
  name: string
}

type input = { roleNamesArray: roleNamesArrayObjectType[] }

export default function addMany({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  const db = subDomainDb.models;

  return async ({ roleNamesArray }: input): Promise<returningSuccessObj<Model<backendRole>[] | null>> => {

    const data = await db.backendRole.bulkCreate(roleNamesArray, {
      transaction,
      returning: true,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}
