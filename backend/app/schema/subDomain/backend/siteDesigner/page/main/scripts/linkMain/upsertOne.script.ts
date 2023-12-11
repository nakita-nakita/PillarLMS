import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageLink from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageLink.model";
import makeBackendSiteDesignerPageLinkSql from "../../../preMain/backendSiteDesignerPageLink.sql";

type input = {
  id?: string;
  pageId: string,
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageLink> | null>> => {

    const sql = makeBackendSiteDesignerPageLinkSql(d);
  
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