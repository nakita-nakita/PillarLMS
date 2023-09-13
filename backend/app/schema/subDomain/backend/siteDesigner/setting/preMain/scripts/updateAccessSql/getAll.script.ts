import { Model } from "sequelize";
import backendSiteDesignerSetting_updateAccess from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting_updateAccess.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

export default function getAll({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting_updateAccess>[]>> => {

    const data = await db.backendSiteDesignerSetting_updateAccess.findAll({
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}


