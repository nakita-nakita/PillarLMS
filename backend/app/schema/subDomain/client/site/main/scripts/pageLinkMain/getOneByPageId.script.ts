import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageLink from "../../../../../../../models/subDomain/client/site/clientSitePageLink.model";
import makeClientSitePageLinkSql from "../../../preMain/clientSitePageLink.sql";

type input = {
  pageId: string
}

export default function getOneByPageId(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageLink> | null>> => {

    const sql = makeClientSitePageLinkSql(d);

    const response = sql.getOneByPageId({
      pageId: args.pageId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}