import { Model } from "sequelize";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getOneById({ domainDb, errorHandler, domainTransaction, loggers, }: dependencies) {

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


