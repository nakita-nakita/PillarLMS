import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageLink from "../../../../../../../models/subDomain/client/site/clientSitePageLink.model";
import makeClientSitePageLinkSql from "../../../preMain/clientSitePageLink.sql";

type input = {
  id?: string;
  pageId: string,
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageLink> | null>> => {

    const sql = makeClientSitePageLinkSql(d);
  
    const response = await sql.upsertOne({
      id: args.id,
      pageId: args.pageId,
      title: args.title,
      description: args.description,
      picture: args.picture,
      pictureAlt: args.pictureAlt,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}