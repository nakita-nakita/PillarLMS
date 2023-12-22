import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoud from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";

export default function getMany(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud>[]>> => {

    const data = await db.backendSiteDesignerPageSectionLoud.findAll({
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data || [],
    };
  };
}