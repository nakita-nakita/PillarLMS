import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteBrowser from "../../../../../../../models/subDomain/client/site/clientSiteBrowser.model";
import makeClientSiteBrowserSql from "../../../preMain/clientSiteBrowser.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteBrowser> | null>> => {

    const sql = makeClientSiteBrowserSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}