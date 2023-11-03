import { Model } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesigner_page> | null>> => {

    const data = await db.backendSiteDesigner_page.findOne({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


