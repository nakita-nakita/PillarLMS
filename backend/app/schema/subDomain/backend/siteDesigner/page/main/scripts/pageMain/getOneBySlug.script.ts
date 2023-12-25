import { Model } from "sequelize";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  slug: string
}

export default function getOneBySlug(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' is has no value.",
        errorIdentifier: "backendSiteDesignerPage_getOneBySlug_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getOneBySlug({
      slug: args.slug,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
