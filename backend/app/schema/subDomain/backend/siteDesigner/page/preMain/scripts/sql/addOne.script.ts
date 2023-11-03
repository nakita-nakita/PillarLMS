import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  nickname: string
  version: string
  data: object
  isReady?: boolean
}

export default function addOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    const data = await db.backendSiteDesigner_page.create(
      args,
      {
        transaction: d.subDomainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


