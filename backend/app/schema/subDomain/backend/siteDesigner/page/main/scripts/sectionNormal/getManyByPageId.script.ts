import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageSectionNormalSql from "../../../preMain/backendSiteDesignerPageSectionNormal.sql";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalSql(d);

    const response = sql.getManyByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}