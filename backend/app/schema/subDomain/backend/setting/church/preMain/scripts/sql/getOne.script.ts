import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSetting_church.model";

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {

    const data = await db.backendSetting_church.findOne({
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}