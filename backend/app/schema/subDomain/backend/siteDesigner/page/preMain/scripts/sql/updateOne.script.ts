import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  nickname?: string
  version?: string
  data?: object
  isReady?: boolean
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    if (args.data) {
      const currentData: Model<backendSiteDesigner_page> = await db.backendSiteDesigner_page.findOne({
        where: {
          id,
        },
        transaction: subDomainTransaction,
      })

      args.data = {
        ...currentData.dataValues.data,
        ...args.data,
      }
    }

    const data = await db.backendSiteDesigner_page.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


