import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const data = await db.backendUser.findOne({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


