import { Model } from "sequelize";
import backendSiteDesigner_pageTemplate from "../../../../../../../../models/subDomain/backend/siteDesigner/pageTemplate/backendSiteDesigner_pageTemplate.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = { 
  nickname: string
  version: string
  data: object
  isReady?: boolean
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_pageTemplate> | null>> => {

    const data = await db.backendSiteDesigner_pageTemplate.create(
      args,
      {
        transaction: subDomainTransaction,
        returning: true,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


