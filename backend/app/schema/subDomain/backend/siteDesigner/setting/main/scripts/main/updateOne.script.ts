import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSql from "../../../preMain/backendSiteDesignerSetting.sql";
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  canAllRead: boolean
  canAllUpdate: boolean
}

export default function updateOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const settingSql = makeBackendSiteDesignerSettingSql(d)

    const setting = await settingSql.updateOne(args).catch(error => d.errorHandler(error, d.loggers))

    return setting
  }
}


