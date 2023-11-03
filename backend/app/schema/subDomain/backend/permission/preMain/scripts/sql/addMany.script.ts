import { Model } from "sequelize";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type permissionNamesArrayObjectType = {
  name: string
}

type input = { permissionNamesArray: permissionNamesArrayObjectType[] }

export default function addMany(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ permissionNamesArray }: input): Promise<returningSuccessObj<Model<backendPermission>[] | null>> => {

    const data = await db.backendPermission.bulkCreate(permissionNamesArray, {
      transaction: d.subDomainTransaction,
      returning: true,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}
