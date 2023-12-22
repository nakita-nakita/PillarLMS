import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageBrowser from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageBrowser.model";

export default function getMany(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageBrowser>[]>> => {

    const data = await db.backendSiteDesignerPageBrowser.findAll({
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}