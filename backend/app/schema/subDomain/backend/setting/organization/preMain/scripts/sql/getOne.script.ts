import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingOrganization from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getOneById(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSettingOrganization> | null>> => {

    const data = await db.backendSettingOrganization.findOne({
      transaction: d.subDomainTransaction,
      order: [['createdAt', 'DESC']]


    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}