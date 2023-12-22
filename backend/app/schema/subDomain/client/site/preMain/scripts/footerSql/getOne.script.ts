import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteFooter from "../../../../../../../models/subDomain/client/site/clientSiteFooter.model";

export default function getOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<clientSiteFooter> | null>> => {

    const data = await db.clientSiteFooter.findOne({
      transaction: d.subDomainTransaction,
      order: [['createdAt', 'DESC']]
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data ? data : null,
    }
  }
}