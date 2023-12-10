import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageBrowser from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageBrowser.model";
import makeBackendSiteDesignerPageBrowserSql from "../../../preMain/backendSiteDesignerPageBrowser.sql";

type input = {
  pageId: string
}

export default function getOneByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageBrowser> | null>> => {

    const sql = makeBackendSiteDesignerPageBrowserSql(d);

    const response = sql.getOneByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}