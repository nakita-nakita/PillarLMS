import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingColors from "../../../../../../../../models/subDomain/backend/setting/backendSettingColors.model";

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const data = await db.backendSettingColors.findOne({
      transaction: subDomainTransaction,
      order: [['createdAt', 'DESC']]
    })
    
    // .catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}