import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type permissionNamesArrayObjectType = {
  name: string
}

type input = { permissionNamesArray: permissionNamesArrayObjectType[] }

export default function addMany({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  const db = subDomainDb.models;

  return async ({ permissionNamesArray }: input): Promise<returningSuccessObj<Model<backendPermission>[] | null>> => {

    const data = await db.backendPermission.bulkCreate(permissionNamesArray, {
      transaction,
      returning: true,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}
