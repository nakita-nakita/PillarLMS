import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteBrowser from "../../../../../../../models/subDomain/client/site/clientSiteBrowser.model";
import makeClientSiteBrowserSql from "../../../preMain/clientSiteBrowser.sql";

type input = {
  id?: string
  favicon?: string
  tab?: string
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteBrowser> | null>> => {

    const sql = makeClientSiteBrowserSql(d);

    const response = await sql.upsertOne({
      id: args.id || undefined,
      favicon: args.favicon,
      tab: args.tab,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}