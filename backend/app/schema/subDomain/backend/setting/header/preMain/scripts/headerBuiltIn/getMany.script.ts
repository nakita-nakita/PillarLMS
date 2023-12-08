import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingHeaderBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeaderBuiltIn.model";

export default function getMany(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingHeaderBuiltIn>[] | null>> => {

    const data = await db.backendSettingHeaderBuiltIn.findAll({
      transaction: d.subDomainTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}