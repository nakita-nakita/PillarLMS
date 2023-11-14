import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooterBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooterBuiltIn.model";

export default function getMany(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingFooterBuiltIn>[] | null>> => {

    const data = await db.backendSettingFooterBuiltIn.findAll({
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}