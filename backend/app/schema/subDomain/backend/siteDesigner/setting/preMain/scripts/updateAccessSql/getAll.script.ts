import { Model } from "sequelize";
import backendSiteDesignerSetting_updateAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getAll(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_updateAccess>[]>> => {

    const data = await db.backendSiteDesignerSetting_updateAccess.findAll({
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


