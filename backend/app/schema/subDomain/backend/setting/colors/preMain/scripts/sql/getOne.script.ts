import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_colors from "../../../../../../../../models/subDomain/backend/setting/backendSetting_colors.model";

export default function getOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSetting_colors> | null>>  => {

    const data = await db.backendSetting_colors.findOne({
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


