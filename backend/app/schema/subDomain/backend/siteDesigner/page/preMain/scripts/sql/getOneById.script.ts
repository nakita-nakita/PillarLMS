import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    const data = await db.backendSiteDesigner_page.findOne({
      where,
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


