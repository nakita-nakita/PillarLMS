import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../../models/subDomain/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  favicon?: string
  tab?: string
  isReady: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const sql = makeBackendSettingSiteSql(d);
    
    const response = await sql.upsertOne({
      id: args.id || undefined,
      isReady: args.isReady,
      favicon: args.favicon,
      tab: args.tab,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}