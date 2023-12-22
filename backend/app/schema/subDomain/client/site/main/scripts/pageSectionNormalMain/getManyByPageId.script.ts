import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../../models/subDomain/client/site/clientSitePageSectionNormal.model";
import makeClientSitePageSectionNormalSql from "../../../preMain/clientSitePageSectionNormal.sql";

type input = {
  pageId: string;
};

export default function getManyByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal>[] | null>> => {

    const sql = makeClientSitePageSectionNormalSql(d);

    const response = sql.getManyByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}