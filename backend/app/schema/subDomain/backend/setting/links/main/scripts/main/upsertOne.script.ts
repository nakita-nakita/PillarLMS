import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingLinkSql from "../../../preMain/backendSettingLink.sql";
import backendSettingLink from "../../../../../../../../models/subDomain/backend/setting/backendSettingLink.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  title?: string
  description?: string
  image?: string
  isReady?: boolean
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingLink> | null>> => {

    const sql = makeBackendSettingLinkSql(d);
    
    const response = sql.upsertOne({
      id: args.id,
      title: args.title,
      description: args.description,
      image: args.image,
      isReady: args.isReady,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}