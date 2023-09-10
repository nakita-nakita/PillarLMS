import { Model } from "sequelize";
import makeBackendSiteDesignerSettingSql from "../../../preMain/backendSiteDesignerSetting.sql";

//models
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";

//utils
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import stringHelpers from "../../../../../../../utils/stringHelpers";

type input = {
  canAllRead: boolean
  canAllUpdate: boolean
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }

    const settingSql = makeBackendSiteDesignerSettingSql(d)

    const setting = await settingSql.updateOne(args).catch(error => errorHandler(error, loggers))

    return setting
  }
}


