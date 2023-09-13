import { Model } from "sequelize";
import backendSiteDesignerSetting from "../../../../../../../../models/subDomain/backend/siteDesigner/setting/backendSiteDesignerSetting.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = { 
  canAllRead: boolean
  canAllUpdate: boolean
 }

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerSetting> | null>> => {

    const data = await db.backendSiteDesignerSetting.update(
      args,
      {
        where: {},
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


