import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteOrganization from "../../../../../../../models/subDomain/client/site/clientSiteOrganization.model";
import makeClientSiteOrganizationSql from "../../../preMain/clientSiteOrganization.sql";


export default function getOne(d: dependencies) {
  return async (): Promise<returningSuccessObj<Model<clientSiteOrganization> | null>> => {

    const backendUserRequestSql = makeClientSiteOrganizationSql(d);

    const response = backendUserRequestSql.getOne().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}