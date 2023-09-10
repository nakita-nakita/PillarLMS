import { Model } from "sequelize";
import backendRoleManyPermission from "../../../../../../../models/subDomain/backend/role/backendRoleManyPermission.model";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  roleId: string
}

export default function getAll({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendRoleManyPermission>[]>> => {

    const data = await db.backendRoleManyPermission.findAll({
      where: {
        roleId: args.roleId,
      },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data,
    }
  }
}


