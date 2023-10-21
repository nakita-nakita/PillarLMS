import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";

type input = {
  id?: string
  title?: string
  description?: string
  image?: string
  isReady?: boolean
}

export default function upsertOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const sql = makeBackendSettingLinkSql(d);
    
    const response = sql.upsertOne({
      id: args.id,
      title: args.title,
      description: args.description,
      image: args.image,
      isReady: args.isReady,
    })
    // .catch(error => errorHandler(error, loggers))

    return response
  }
}