import { Model } from "sequelize";
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const data = await db.backendSiteDesignerSetting.findOne({
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


