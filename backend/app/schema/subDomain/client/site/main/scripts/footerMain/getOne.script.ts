import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteFooter from "../../../../../../../models/subDomain/client/site/clientSiteFooter.model";
import makeClientSiteFooterSql from "../../../preMain/clientSiteFooter.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteFooter> | null>> => {

    const sql = makeClientSiteFooterSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}