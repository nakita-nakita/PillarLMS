import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteHeader from "../../../../../../../models/subDomain/client/site/clientSiteHeader.model";
import makeClientSiteHeaderSql from "../../../preMain/clientSiteHeader.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteHeader> | null>> => {

    const sql = makeClientSiteHeaderSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}