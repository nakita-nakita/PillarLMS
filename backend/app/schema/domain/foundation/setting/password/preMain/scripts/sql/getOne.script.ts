import { Model } from "sequelize";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";
import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getOneById({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (): Promise<returningSuccessObj<Model<foundationSetting_password> | null>> => {

    const data = await db.foundationSetting_password.findOne({
      transaction: domainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


