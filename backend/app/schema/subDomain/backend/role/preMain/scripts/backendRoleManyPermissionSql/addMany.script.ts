import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  roleId: string
  permissionId: string
}

export default function addManyPermissions(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input[]): Promise<returningSuccessObj<Model<backendRoleManyPermission>>> => {

    const data = await db.backendRoleManyPermission.bulkCreate(args, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


