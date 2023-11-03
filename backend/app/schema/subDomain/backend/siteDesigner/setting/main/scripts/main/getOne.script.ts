import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSql from "../../../preMain/backendSiteDesignerSetting.sql";
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getOne(d: dependencies) {

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const settingSql = makeBackendSiteDesignerSettingSql(d)

    //////////////////////////////////////
    // Sql
    // ===================================
    
    const setting = await settingSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


