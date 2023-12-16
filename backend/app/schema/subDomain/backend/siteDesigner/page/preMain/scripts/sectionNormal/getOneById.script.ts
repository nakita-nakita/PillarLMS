import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";

type input = {
  id: string;
};

export default function getOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {
    const { id } = args;

    const data = await db.backendSiteDesignerPageSectionNormal.findByPk(id, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data ? data : null,
    };
  };
}
