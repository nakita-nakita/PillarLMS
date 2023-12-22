import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteLink from "../../../../../../../models/subDomain/client/site/clientSiteLink.model";
import makeClientSiteLinkSql from "../../../preMain/clientSiteLink.sql";

type input = {
  id?: string
  title?: string
  description?: string
  image?: string
}

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteLink> | null>> => {

    const sql = makeClientSiteLinkSql(d);
    
    const response = sql.upsertOne({
      id: args.id,
      title: args.title,
      description: args.description,
      image: args.image,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}