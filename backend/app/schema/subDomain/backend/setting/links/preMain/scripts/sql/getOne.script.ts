import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const data = await db.backendSettingLink.findOne({
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