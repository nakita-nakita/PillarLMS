import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteColors from "../../../../../../../models/subDomain/client/site/clientSiteColors.model";
import makeClientSiteColorsSql from "../../../preMain/clientSiteColors.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteColors> | null>> => {

    const sql = makeClientSiteColorsSql(d);

    const response = sql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}