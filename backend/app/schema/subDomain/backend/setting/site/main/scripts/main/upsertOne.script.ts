import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSettingSite from "../../../../../../../../models/subDomain/backend/setting/backendSettingSite.model";
import makeBackendSettingSiteSql from "../../../preMain/backendSettingSite.sql";

type input = {
  id?: string
  favicon?: string
  tab?: string
  isReady: boolean
}

export default function upsertOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingSite> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const sql = makeBackendSettingSiteSql(d);
    
    const response = await sql.upsertOne({
      id: args.id || undefined,
      isReady: args.isReady,
      favicon: args.favicon,
      tab: args.tab,
    })
    // .catch(error => errorHandler(error, loggers))

    return response
  }
}