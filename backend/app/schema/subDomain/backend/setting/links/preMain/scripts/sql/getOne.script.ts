import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_links from "../../../../../../../../models/subDomain/backend/setting/backendSetting_links.model";

export default function getOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSetting_links> | null>> => {

    const data = await db.backendSetting_links.findOne({
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


