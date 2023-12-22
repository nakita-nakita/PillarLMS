import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageBrowser from "../../../../../../../models/subDomain/client/site/clientSitePageBrowser.model";
import makeClientSitePageBrowserSql from "../../../preMain/clientSitePageBrowser.sql";

type input = {
  id?: string;
  pageId?: string;
  tabName?: string;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageBrowser> | null>> => {

    const sql = makeClientSitePageBrowserSql(d);
  
    const response = sql.upsertOne({
      id: args.id,
      pageId: args.pageId,
      tabName: args.tabName,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}