import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../../models/subDomain/client/site/clientSitePageSectionNormal.model";
import makeClientSitePageSectionNormalSql from "../../../preMain/clientSitePageSectionNormal.sql";

type Input = {
  id: string;
};

export default function deleteOne(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {

    const sql = makeClientSitePageSectionNormalSql(d);

    const response = sql.deleteOne({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}