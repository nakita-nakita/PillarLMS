import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionLoud from "../../../../../../../models/subDomain/client/site/clientSitePageSectionLoud.model";
import makeClientSitePageSectionLoudSql from "../../../preMain/clientSitePageSectionLoud.sql";

type Input = {
  pageId: string;
};


export default function getOneByPageId(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<clientSitePageSectionLoud> | null>> => {

    const sql = makeClientSitePageSectionLoudSql(d);

    const response = sql.getOneByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}