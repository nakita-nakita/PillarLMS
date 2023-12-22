import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteLink from "../../../../../../../models/subDomain/client/site/clientSiteLink.model";
import makeClientSiteLinkSql from "../../../preMain/clientSiteLink.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteLink> | null>> => {

    const sql = makeClientSiteLinkSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}